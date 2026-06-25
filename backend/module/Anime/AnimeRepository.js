import DB from "../../components/DBComponent.js";

export default class AnimeRepository {
    constructor() {
        this.db = new DB();
        this.db.init();
    }

    async getAnimeAll() {
        return await this.db.executeNameQuery("getAnimeAll");
    }

    async getAnimeById(id) {
        return await this.db.executeNameQuery("getAnimeById", { id });
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
}
