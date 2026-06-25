import axios from "axios";

export default class AnimeApiRepository {
    constructor() {
        this.baseUrl = "https://api.jikan.moe/v4";
        this.api = axios.create({ baseURL: this.baseUrl, timeout: 5000 });
    }

    /**
     * Obtiene el detalle completo de un anime desde Jikan
     * @param {number} malId
     */
    async getAnimeByMalId(malId) {
        try {
            const response = await this.api.get(`/anime/${malId}/full`);
            return response.data?.data || null;
        } catch (error) {
            if (error.response && error.response.status === 404) return null;
            throw new Error(`Error en Jikan API (Anime): ${error.message}`);
        }
    }

    /**
     * Obtiene la lista de episodios detallada de un anime
     * @param {number} malId
     */
    async getEpisodesByMalId(malId) {
        try {
            const response = await this.api.get(`/anime/${malId}/episodes`);
            return response.data?.data || [];
        } catch (error) {
            // Si no tiene episodios cargados o da error, devolvemos array vacío para no romper el flujo
            console.error(
                `No se pudieron obtener episodios para MAL ID ${malId}:`,
                error.message,
            );
            return [];
        }
    }

    /**
     * Búsqueda avanzada y listados generales de Anime
     * @param {Object} filters - Objeto con los filtros dinámicos
     * @param {string} [filters.q] - Texto para buscar por título (ej: "Naruto")
     * @param {number} [filters.limit] - Cantidad de resultados por página (Máximo 25 por página según políticas de Jikan)
     * @param {number} [filters.page] - Número de página para la paginación
     * @param {string} [filters.genres] - IDs de géneros separados por comas (ej: "1,2,4")
     * @param {number} [filters.year] - Año de emisión (ej: 2024)
     * @param {string} [filters.season] - Temporada ("winter", "spring", "summer", "fall")
     * @param {string} [filters.order_by] - Campo de ordenación ("score", "popularity", "title", "rank")
     * @param {string} [filters.sort] - Dirección del orden ("asc", "desc")
     */
    async searchAnimes(filters = {}) {
        try {
            // Pasamos los filtros directamente como Query Params (?q=...&limit=...)
            const response = await this.api.get("/anime", { params: filters });

            // Jikan devuelve un objeto con { data: [...], pagination: {...} }
            return {
                animes: response.data?.data || [],
                pagination: response.data?.pagination || {},
            };
        } catch (error) {
            throw new Error(`Error buscando animes en Jikan: ${error.message}`);
        }
    }

    /**
     * Obtiene la lista oficial de géneros disponibles en MyAnimeList y sus IDs
     */
    async getGenresList() {
        try {
            const response = await this.api.get("/genres/anime");
            return response.data?.data || [];
        } catch (error) {
            throw new Error(
                `Error al traer géneros de Jikan: ${error.message}`,
            );
        }
    }

    /**
     * Obtiene una lista de 25 animes ordenados por popularidad
     * @param {number} page - La página que deseas consultar (1, 2, 3...)
     */
    async getPopularAnimes(page = 1) {
        try {
            const response = await this.api.get("/anime", {
                params: {
                    page: page,
                    limit: 25,
                    order_by: "popularity",
                    sort: "asc", // De más popular a menos popular
                },
            });

            return response.data?.data || [];
        } catch (error) {
            throw new Error(
                `Error al obtener lista de animes: ${error.message}`,
            );
        }
    }

    /**
     * Obtiene un único anime completamente aleatorio de MyAnimeList
     */
    async getRandomAnime() {
        try {
            const response = await this.api.get("/random/anime");
            return response.data?.data || null;
        } catch (error) {
            throw new Error(`Error al obtener anime random: ${error.message}`);
        }
    }

    /**
     * Obtiene un total de 100 animes realizando 4 peticiones paginadas a Jikan
     * @param {Object} baseFilters - Filtros opcionales (ej: { order_by: 'popularity' })
     */
    async getPagesAnimes(baseFilters = {}) {
        let allAnimes = [];
        const limitPerPage = 25;
        const totalPagesNeeded = 4; // 4 páginas x 25 = 100 animes

        try {
            for (let page = 1; page <= totalPagesNeeded; page++) {
                console.log(`Descargando página ${page} de Jikan...`);

                // Combinamos los filtros base con la página actual y el límite estricto de 25
                const response = await this.animeApiRepo.searchAnimes({
                    ...baseFilters,
                    page: page,
                    limit: limitPerPage,
                });

                if (response.animes && response.animes.length > 0) {
                    allAnimes = allAnimes.concat(response.animes);
                } else {
                    // Si una página viene vacía, rompemos el bucle antes (ya no hay más resultados)
                    break;
                }

                // Esperar un pequeño instante (ej: 400ms) entre peticiones
                // para no saturar la versión pública y gratuita de Jikan API.
                await new Promise((resolve) => setTimeout(resolve, 400));
            }

            return {
                source: "api_bulk_load",
                requested_count: allAnimes.length,
                data: allAnimes,
            };
        } catch (error) {
            throw new Error(
                `Fallo al recolectar los 100 animes: ${error.message}`,
            );
        }
    }

    async getAnimeById(id) {
        try {
            const response = await this.api.get(`/anime/${id}`);
            return response.data?.data || null;
        } catch (error) {
            throw new Error(`Error al obtener anime por ID: ${error.message}`);
        }
    }
}
