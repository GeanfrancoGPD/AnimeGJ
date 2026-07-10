import DB from "../../components/DBComponent.js";

export default class AnimeRepository {
  constructor() {
    this.db = new DB();
    this.db.init();
  }

  //Users
  async getUserByEmail(gmail) {
    console.log("gmail:", gmail);

    let respuesta = await this.db.executeNameQuery("getUserByEmail", {
      gmail,
    });
    console.log("Respuesta:", respuesta);
    return respuesta;
  }

  async createUser(nombre, gmail, passwordHash) {
    return await this.db.executeNameQuery("createUser", {
      nombre,
      gmail,
      password: passwordHash,
    });
  }

  async deleteUserAccount(id) {
    return await this.db.executeNameQuery("deleteUser", { id });
  }

  async getAllUsers() {
    return await this.db.executeNameQuery("getUsers");
  }

  //Animes

  async getAnimeAll() {
    return await this.db.executeNameQuery("getAnimeAll");
  }

  async getAnimeById(id) {
    return await this.db.executeNameQuery("getAnimeById", { mal_id: id });
  }

  async createAnime(animeData) {
    return await this.db.executeNameQuery("createAnime", animeData);
  }

  async saveAnimeGenreRelation(animeId, genreId) {
    return await this.db.executeNameQuery("saveAnimeGenreRelation", {
      anime_id: animeId,
      genre_id: genreId,
    });
  }

  async updateAnime(id, animeData) {
    return await this.db.executeNameQuery("updateAnime", {
      id,
      ...animeData,
    });
  }

  async deleteAnime(id) {
    return await this.db.executeNameQuery("deleteAnime", { id });
  }

  async getGenres() {
    return await this.db.executeNameQuery("genres");
  }

  async saveGenres(genres) {
    const listaGeneros = Array.isArray(genres) ? genres : genres.data || [];

    for (const genre of listaGeneros) {
      // Creamos un objeto limpio que solo contenga lo que 'structure_params' espera
      const generoLimpio = {
        mal_id: genre.mal_id,
        name: genre.name,
      };
      await this.db.executeNameQuery("createGenre", generoLimpio);
    }
  }

  async getEpisodesDetails(animeId) {
    return await this.db.executeNameQuery("getEpisodesDetails", {
      mal_id: animeId,
    });
  }

  async saveEpisodesDetails(animeId, episodes) {
    for (const episode of episodes) {
      const episodeData = {
        mal_id: episode.mal_id,
        anime_id: Number(animeId),
        number: episode.mal_id, // o i + 1
        title: episode.title,
        title_japanese: episode.title_japanese,
        title_romanji: episode.title_romanji,
        aired: episode.aired?.split("T")[0] ?? null,
        filler: episode.filler ?? false,
        recap: episode.recap ?? false,
        duration: null,
      };
      await this.db.executeNameQuery("createEpisode", episodeData);
    }
  }
  // Favoritos
  async getFavoriteByUserAndAnime(usuarioId, animeId) {
    return await this.db.executeNameQuery("getFavoriteByUserAndAnime", {
      user_id: usuarioId,
      anime_id: animeId,
    });
  }

  async addFavorite(usuarioId, animeId) {
    return await this.db.executeNameQuery("addFavorite", {
      user_id: usuarioId,
      anime_id: animeId,
    });
  }

  async removeFavorite(usuarioId, animeId) {
    return await this.db.executeNameQuery("removeFavorite", {
      user_id: usuarioId,
      anime_id: animeId,
    });
  }

  async getFavoriteAnimesByUser(usuarioId) {
    return await this.db.executeNameQuery("getFavoriteAnimesByUser", {
      user_id: usuarioId,
    });
  }

  async addComment(usuarioId, animeId, comentario) {
    return await this.db.executeNameQuery("addComment", {
      user_id: usuarioId,
      anime_id: animeId,
      comment_text: comentario,
    });
  }

  async getCommentsByAnime(animeId) {
    return await this.db.executeNameQuery("getCommentsByAnime", {
      anime_id: animeId,
    });
  }

  async removeComment(usuarioId, _animeId, commentId) {
    return await this.db.executeNameQuery("removeComment", {
      id: commentId,
      user_id: usuarioId,
    });
  }
}
