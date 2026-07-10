import AnimeRepository from "./AnimeRepository.js";
import Session from "../../components/session.js";
import UtilBycript from "../../util/bycript.js";
import Validator from "../../util/validator.js";
import AnimeApiRepository from "./AnimeApiRepository.js";

export default class AnimeBO {
  constructor() {
    this.repository = new AnimeRepository();
    this.session = Session;
    this.bcrypt = UtilBycript;
    this.validator = Validator;
    this.apiRepository = new AnimeApiRepository();
  }

  // Auth

  async resolveUserId(req) {
    if (req.session && req.session.user && req.session.user.id) {
      return req.session.user.id;
    }
    return null;
  }

  getValidationMessage(validation) {
    return validation?.error?.issues?.[0]?.message || "Dato inválido";
  }

  async login(req, res) {
    const { gmail, password } = req.body;
    if (!gmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Correo electrónico y contraseña son requeridos",
      });
    }

    const emailValidation = await this.validator.validateEmail(gmail);
    if (!emailValidation.success) {
      return res.status(400).json({
        success: false,
        message: this.getValidationMessage(emailValidation),
      });
    }

    const passwordValidation = await this.validator.validatePassword(password);
    if (!passwordValidation.success) {
      return res.status(400).json({
        success: false,
        message: this.getValidationMessage(passwordValidation),
      });
    }

    const user = await this.repository.getUserByEmail(gmail);

    if (!user.length) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const valid = await this.bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    await this.session.createSession({ request: req, response: res }, user);
  }

  async register(req, res) {
    const { nombre, gmail, password } = req.body;

    if (!nombre || !gmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los datos son requeridos",
      });
    }

    const nameValidation = await this.validator.validateUsername(nombre);
    if (!nameValidation.success) {
      return res.status(400).json({
        success: false,
        message: this.getValidationMessage(nameValidation),
      });
    }

    const emailValidation = await this.validator.validateEmail(gmail);
    if (!emailValidation.success) {
      return res.status(400).json({
        success: false,
        message: this.getValidationMessage(emailValidation),
      });
    }

    const passwordValidation = await this.validator.validatePassword(password);
    if (!passwordValidation.success) {
      return res.status(400).json({
        success: false,
        message: this.getValidationMessage(passwordValidation),
      });
    }

    const existingUser = await this.repository.getUserByEmail(gmail);
    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El correo electrónico ya está registrado",
      });
    }

    const hashedPassword = await this.bcrypt.hash(password);

    await this.repository.createUser(nombre, gmail, hashedPassword);

    return res.status(201).json({
      success: true,
      message: "Se ha creado el usuario correctamente",
    });
  }

  async logout(req, res) {
    return this.session.destroySession({ request: req, response: res });
  }

  async getCurrentUser(req, res) {
    const isAuthenticated = this.session.sessionExist({
      request: req,
      response: res,
    });

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        message: "No hay usuario autenticado",
      });
    }

    const currentUser = req.session.user;

    return res.status(200).json({
      success: true,
      data: currentUser,
    });
  }

  async deleteUserAccount(req, res) {
    try {
      const usuarioId = req.body.id ?? (await this.resolveUserId(req));

      if (!usuarioId) {
        return res
          .status(400)
          .json({ success: false, message: "Usuario inválido" });
      }
      const data = await this.repository.deleteUserAccount(usuarioId);
      req.session.destroy(() => {});
      return res.json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "No se pudo eliminar la cuenta" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const data = await this.repository.getAllUsers();
      return res.json({ success: true, data: data ?? [] });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "No se pudieron cargar los usuarios",
      });
    }
  }
  // Anime

  async getAnimeAll(req, res) {
    try {
      // 1. Intentar sincronizar de forma segura
      const apiAnimes = await this.apiRepository.getPopularAnimes();

      if (apiAnimes && apiAnimes.length > 0) {
        // Usamos Promise.all para procesar en paralelo o mapear sin bloquear el hilo principal
        const mappingPromises = apiAnimes.map(async (anime) => {
          try {
            const mapped = await this.maperAnimeData(anime);
            await this.repository.createAnime(mapped);
          } catch (insertError) {
            // Si un anime individual falla (por ejemplo, duplicado), el bucle no se cae
            console.error(
              `Error guardando anime individual: ${anime.title}`,
              insertError.message,
            );
          }
        });

        // Esperamos que terminen todas las inserciones concurrentes
        await Promise.all(mappingPromises);
      }
    } catch (error) {
      // Si Jikan da un 429 o cae, el backend avisa pero NO rompe el flujo
      console.warn(
        "No se pudo sincronizar con Jikan (Usando datos locales de la BD):",
        error.message,
      );
    }

    // 2. Recuperar los datos locales pase lo que pase
    try {
      // IMPORTANTE: Verifica que dentro de este método llames a executeNameQuery("getAnimeAll")
      const animes = await this.repository.getAnimeAll();

      return res.status(200).json({
        success: true,
        count: animes ? animes.length : 0,
        data: animes || [],
      });
    } catch (dbError) {
      console.error(
        "Error crítico al consultar la base de datos local:",
        dbError,
      );
      return res.status(500).json({
        success: false,
        message: "Error interno al obtener los animes de la base de datos.",
      });
    }
  }

  async getAnimeById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID de anime es requerido",
      });
    }

    try {
      let anime = await this.repository.getAnimeById(id);

      if (!anime.length) {
        anime = await this.apiRepository.getAnimeById(id);

        if (!anime) {
          return res.status(404).json({
            success: false,
            message: "Anime no encontrado en la API",
          });
        }

        const mappedData = await this.maperAnimeData(anime);

        const dbResult = await this.repository.createAnime(mappedData);

        if (dbResult) {
          return res.status(200).json({
            success: true,
            data: {
              ...mappedData,
            },
          });
        }
      }

      return res.status(200).json({ success: true, data: anime[0] });
    } catch (error) {
      console.error(`Error al obtener el anime con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async getGenres(req, res) {
    try {
      let genres = await this.repository.getGenres();
      if (!genres || genres.length === 0) {
        genres = await this.apiRepository.getGenresList();
        await this.repository.saveGenres(genres);
      }
      return res.status(200).json({ success: true, data: genres });
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async searchAnimes(req, res) {
    const filters = req.query;

    try {
      const { animes, pagination } =
        await this.apiRepository.searchAnimes(filters);

      return res.status(200).json({
        success: true,
        data: animes,
        pagination: pagination,
      });
    } catch (error) {
      console.error("Error al buscar animes:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async getEpisodeDetails(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID de anime es requerido",
      });
    }

    try {
      let dbEpisodes = await this.repository.getEpisodesDetails(id);
      console.log(
        `Episodios obtenidos desde BD para MAL ID ${id}:`,
        dbEpisodes,
      );
      if (!dbEpisodes || dbEpisodes.length === 0) {
        console.log(
          `Anime ID ${id} no encontrado en BD. Buscando en API Jikan...`,
        );

        // Buscamos en la API (Debería retornar el array de datos directamente)
        const apiEpisodes = await this.apiRepository.getEpisodesByMalId(id);
        console.log(`Episodios obtenidos desde Jikan: ${apiEpisodes.length}`);

        // CORREGIDO: Ajustamos la validación al array directo devuelto por tu repositorio API
        if (!apiEpisodes || apiEpisodes.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No se encontraron episodios para este anime en la API",
          });
        }

        console.log(
          `Episodios obtenidos exitosamente desde Jikan: ${apiEpisodes.length}`,
        );

        // Guardamos en la base de datos
        await this.repository.saveEpisodesDetails(id, apiEpisodes);

        // Refrescamos nuestra variable local desde la BD
        dbEpisodes = await this.repository.getEpisodesDetails(id);
      }

      return res.status(200).json({
        success: true,
        data: dbEpisodes,
      });
    } catch (error) {
      console.error(
        `Error al obtener detalles de los episodios para MAL ID ${id}:`,
        error,
      );
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async maperAnimeData(anime) {
    return {
      mal_id: anime.mal_id,
      title: anime.title,
      title_english: anime.title_english || null,
      title_japanese: anime.title_japanese || null,
      type: anime.type || null,
      episodes: anime.episodes || null,
      status: anime.status || null,
      aired_from: anime.aired?.from ? anime.aired.from.split("T")[0] : null,
      aired_to: anime.aired?.to ? anime.aired.to.split("T")[0] : null,
      duration: anime.duration || null,
      rating: anime.rating || null,
      score: anime.score || 0,
      scored_by: anime.scored_by || 0,
      rank: anime.rank || 0,
      popularity: anime.popularity || 0,
      members: anime.members || 0,
      synopsis: anime.synopsis || null,
      image_url:
        anime.images?.jpg?.large_image_url ||
        anime.images?.jpg?.image_url ||
        null,

      // Ajuste Proactivo para el Trailer: si la URL principal es null, guardamos el embed_url
      trailer_url: anime.trailer?.url || anime.trailer?.embed_url || null,

      // NUEVOS CAMPOS: Mapeo explícito de temporada y año
      season: anime.season || null,
      year: anime.year || null,
    };
  }

  async getFavoriteAnimes(req, res) {
    const userId = req.session.user.id;

    try {
      const favoriteAnimes =
        await this.repository.getFavoriteAnimesByUser(userId);

      return res.status(200).json({
        success: true,
        data: favoriteAnimes,
      });
    } catch (error) {
      console.error("Error al obtener animes favoritos:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async addFavorite(req, res) {
    const { mal_id } = req.body;
    const userId = req.session.user.id;

    if (!mal_id) {
      return res.status(400).json({
        success: false,
        message: "MAL ID es requerido",
      });
    }

    try {
      // Verificamos si el anime ya está en favoritos
      const existingFavorite = await this.repository.getFavoriteByUserAndAnime(
        userId,
        mal_id,
      );

      if (existingFavorite.length > 0) {
        return res.status(409).json({
          success: false,
          message: "El anime ya está en favoritos",
        });
      }

      // Agregamos a favoritos
      await this.repository.addFavorite(userId, mal_id);

      return res.status(201).json({
        success: true,
        message: "Anime agregado a favoritos",
      });
    } catch (error) {
      console.error("Error al agregar favorito:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async removeFavorite(req, res) {
    const { mal_id } = req.body;
    const userId = req.session.user.id;

    if (!mal_id) {
      return res.status(400).json({
        success: false,
        message: "MAL ID es requerido",
      });
    }

    try {
      // Verificamos si el anime está en favoritos
      const existingFavorite = await this.repository.getFavoriteByUserAndAnime(
        userId,
        mal_id,
      );

      if (existingFavorite.length === 0) {
        return res.status(404).json({
          success: false,
          message: "El anime no está en favoritos",
        });
      }

      // Eliminamos de favoritos
      await this.repository.removeFavorite(userId, mal_id);

      return res.status(200).json({
        success: true,
        message: "Anime eliminado de favoritos",
      });
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async addComment(req, res) {
    const { mal_id, comment } = req.body;
    const userId = req.session.user.id;

    if (!mal_id || !comment) {
      return res.status(400).json({
        success: false,
        message: "MAL ID y comentario son requeridos",
      });
    }

    try {
      await this.repository.addComment(userId, mal_id, comment);

      return res.status(201).json({
        success: true,
        message: "Comentario agregado exitosamente",
      });
    } catch (error) {
      console.error("Error al agregar comentario:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async removeComment(req, res) {
    const { mal_id, comment_id } = req.body;
    const userId = req.session.user.id;

    if (!mal_id || !comment_id) {
      return res.status(400).json({
        success: false,
        message: "MAL ID y ID de comentario son requeridos",
      });
    }

    try {
      await this.repository.removeComment(userId, mal_id, comment_id);

      return res.status(200).json({
        success: true,
        message: "Comentario eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async getComments(req, res) {
    const { mal_id } = req.params;

    if (!mal_id) {
      return res.status(400).json({
        success: false,
        message: "MAL ID es requerido",
      });
    }

    try {
      const comments = await this.repository.getCommentsByAnime(mal_id);

      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
}
