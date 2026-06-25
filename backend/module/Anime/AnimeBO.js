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

        const passwordValidation =
            await this.validator.validatePassword(password);
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

        const passwordValidation =
            await this.validator.validatePassword(password);
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

    // Anime

    async getAnimeAll(req, res) {
        try {
            let animes = await this.repository.getAnimeAll();
            console.log("Animes obtenidos de la BD:", animes);

            if (!animes || animes.length === 0) {
                // 1. Obtener la lista desde la API
                const apiAnimes = await this.apiRepository.getPopularAnimes();
                console.log("Animes obtenidos de la API:", apiAnimes.length);

                const savedAnimesList = [];

                // 2. Bucle para procesar y mapear uno por uno
                for (const item of apiAnimes) {
                    const mappedData = {
                        mal_id: item.mal_id,
                        title: item.title,
                        title_english: item.title_english || null,
                        title_japanese: item.title_japanese || null,
                        type: item.type || null,
                        episodes: item.episodes || null,
                        status: item.status || null,
                        aired_from: item.aired?.from
                            ? item.aired.from.split("T")[0]
                            : null,
                        aired_to: item.aired?.to
                            ? item.aired.to.split("T")[0]
                            : null,
                        duration: item.duration || null,
                        rating: item.rating || null,
                        score: item.score || 0,
                        scored_by: item.scored_by || 0,
                        rank: item.rank || 0,
                        popularity: item.popularity || 0,
                        members: item.members || 0,
                        synopsis: item.synopsis || null,
                        image_url:
                            item.images?.jpg?.large_image_url ||
                            item.images?.jpg?.image_url ||
                            null,

                        // Ajuste Proactivo para el Trailer: si la URL principal es null, guardamos el embed_url
                        trailer_url:
                            item.trailer?.url ||
                            item.trailer?.embed_url ||
                            null,

                        // NUEVOS CAMPOS: Mapeo explícito de temporada y año
                        season: item.season || null,
                        year: item.year || null,
                    };

                    // 3. Guardar en la base de datos
                    const dbResult =
                        await this.repository.createAnime(mappedData);

                    if (dbResult) {
                        savedAnimesList.push({
                            id: dbResult.id,
                            malId: dbResult.mal_id,
                            title: dbResult.title,
                            score: parseFloat(dbResult.score || 0),
                            imageUrl: dbResult.image_url,
                        });
                    }
                }

                return res
                    .status(200)
                    .json({ success: true, data: savedAnimesList });
            }

            return res.status(200).json({ success: true, data: animes });
        } catch (error) {
            console.error("Error al obtener todos los animes:", error);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
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

                const mappedData = {
                    mal_id: anime.mal_id,
                    title: anime.title,
                    title_english: anime.title_english || null,
                    title_japanese: anime.title_japanese || null,
                    type: anime.type || null,
                    episodes: anime.episodes || null,
                    status: anime.status || null,
                    aired_from: anime.aired?.from
                        ? anime.aired.from.split("T")[0]
                        : null,
                    aired_to: anime.aired?.to
                        ? anime.aired.to.split("T")[0]
                        : null,
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
                    trailer_url:
                        anime.trailer?.url || anime.trailer?.embed_url || null,

                    // NUEVOS CAMPOS: Mapeo explícito de temporada y año
                    season: anime.season || null,
                    year: anime.year || null,
                };

                const dbResult = await this.repository.createAnime(mappedData);

                if (dbResult) {
                    return res.status(200).json({
                        success: true,
                        data: {
                            id: dbResult.id,
                            malId: dbResult.mal_id,
                            title: dbResult.title,
                            score: parseFloat(dbResult.score || 0),
                            imageUrl: dbResult.image_url,
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
}
