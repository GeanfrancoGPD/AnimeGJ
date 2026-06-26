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
        console.log("DATA=====", { nombre, gmail, passwordHash });

        return await this.db.executeNameQuery("createUser", {
            nombre,
            gmail,
            password: passwordHash,
        });
    }

    async deleteUserAccount(id) {
        return await this.db.executeNameQuery("deleteUserAccount", { id });
    }

    async getAllUsers() {
        return await this.db.executeNameQuery("getAllUsers");
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
}
