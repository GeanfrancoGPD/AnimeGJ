import type {
  User,
  Anime,
  Episode,
  Comment,
  Favorite,
  WatchHistoryEntry,
  PaginatedResponse,
} from '../types';

const mockUser: User = {
  id: 1,
  name: 'Juan Pérez',
  email: 'juan@animeverse.com',
  role: 'user',
  createdAt: '2026-01-15T10:00:00Z',
};

const mockAnimes: Anime[] = [
  {
    id: 1,
    malId: 52299,
    title: 'Solo Leveling',
    titleEnglish: 'Solo Leveling',
    titleJapanese: '俺だけレベルアップな件',
    synopsis:
      'En un mundo donde los cazadores deben enfrentarse a monstruos para proteger a la humanidad, Sung Jin-Woo, conocido como el cazador más débil de la humanidad, se encuentra en una lucha constante por sobrevivir. Después de sobrevivir a una mazmorra doble, obtiene un poder misterioso que le permite "subir de nivel" de manera única.',
    type: 'TV',
    episodes: 12,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2024-01-06',
    airedTo: '2024-03-23',
    duration: '24 min per ep',
    rating: 'PG-13',
    score: 9.4,
    scoredBy: 850000,
    rank: 1,
    popularity: 1,
    members: 2000000,
    season: 'winter',
    year: 2024,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1803/131212.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=4M7WHtIh4L0',
    genres: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    id: 2,
    malId: 5114,
    title: 'Fullmetal Alchemist: Brotherhood',
    titleEnglish: 'Fullmetal Alchemist: Brotherhood',
    titleJapanese: '鋼の錬金術師 FULLMETAL ALCHEMIST',
    synopsis:
      'Los hermanos Edward y Alphonse Elric cometen el tabú de la transmutación humana al intentar revivir a su madre. Como consecuencia, Edward pierde una pierna y Alphonse pierde su cuerpo. En su búsqueda de la Piedra Filosofal para recuperar lo que perdieron, descubren una conspiración que amenaza el mundo.',
    type: 'TV',
    episodes: 64,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2009-04-05',
    airedTo: '2010-07-04',
    duration: '24 min per ep',
    rating: 'R - 17+',
    score: 9.7,
    scoredBy: 1200000,
    rank: 1,
    popularity: 3,
    members: 3500000,
    season: 'spring',
    year: 2009,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=--IcmZkvL0Q',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
  },
  {
    id: 3,
    malId: 21,
    title: 'One Piece',
    titleEnglish: 'One Piece',
    titleJapanese: 'ワンピース',
    synopsis:
      'Monkey D. Luffy, un joven que obtiene propiedades de goma después de comer una fruta del diablo, reúne una tripulación de piratas para encontrar el tesoro legendario One Piece y convertirse en el Rey de los Piratas.',
    type: 'TV',
    episodes: 1000,
    status: 'Currently Airing',
    airing: true,
    airedFrom: '1999-10-20',
    duration: '24 min per ep',
    rating: 'PG-13',
    score: 9.4,
    scoredBy: 980000,
    rank: 2,
    popularity: 2,
    members: 3000000,
    season: 'fall',
    year: 1999,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=S8_YwFLCh4U',
    genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy'],
  },
  {
    id: 4,
    malId: 9253,
    title: 'Steins;Gate',
    titleEnglish: 'Steins;Gate',
    titleJapanese: 'シュタインズ・ゲート',
    synopsis:
      'Un científico loco autoproclamado, Rintaro Okabe, descubre accidentalmente que puede enviar mensajes al pasado a través de un microondas modificado. Pronto se da cuenta de que alterar el pasado tiene consecuencias devastadoras.',
    type: 'TV',
    episodes: 24,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2011-04-06',
    airedTo: '2011-09-14',
    duration: '24 min per ep',
    rating: 'PG-13',
    score: 9.5,
    scoredBy: 780000,
    rank: 3,
    popularity: 5,
    members: 2500000,
    season: 'spring',
    year: 2011,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=27OZR8t_N_k',
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
  },
  {
    id: 5,
    malId: 1535,
    title: 'Death Note',
    titleEnglish: 'Death Note',
    titleJapanese: 'デスノート',
    synopsis:
      'Un estudiante de secundaria brillante, Light Yagami, encuentra un cuaderno sobrenatural llamado Death Note que le permite matar a cualquier persona cuyo nombre escriba en él. Decide usarlo para eliminar criminales y crear un nuevo mundo, atrayendo la atención del detective más grande del mundo, L.',
    type: 'TV',
    episodes: 37,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2006-10-04',
    airedTo: '2007-06-27',
    duration: '24 min per ep',
    rating: 'R - 17+',
    score: 9.4,
    scoredBy: 1100000,
    rank: 4,
    popularity: 4,
    members: 3200000,
    season: 'fall',
    year: 2006,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1079/138254.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=NlJZ-YgAtc8',
    genres: ['Mystery', 'Psychological', 'Supernatural', 'Thriller'],
  },
  {
    id: 6,
    malId: 11061,
    title: 'Hunter x Hunter (2011)',
    titleEnglish: 'Hunter x Hunter',
    titleJapanese: 'ハンター×ハンター',
    synopsis:
      'Gon Freecss descubre que su padre, a quien creía muerto, es en realidad un legendario cazador. Decide convertirse en cazador para encontrarlo, enfrentando desafíos peligrosos y haciendo amigos en el camino.',
    type: 'TV',
    episodes: 148,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2011-10-02',
    airedTo: '2014-09-24',
    duration: '24 min per ep',
    rating: 'PG-13',
    score: 9.5,
    scoredBy: 890000,
    rank: 5,
    popularity: 6,
    members: 2800000,
    season: 'fall',
    year: 2011,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=d6kBeJjTGnY',
    genres: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    id: 7,
    malId: 42938,
    title: "Frieren: Beyond Journey's End",
    titleEnglish: "Frieren: Beyond Journey's End",
    titleJapanese: '葬送のフリーレン',
    synopsis:
      'Después de derrotar al Rey Demonio, la elfa maga Frieren viaja con sus antiguos compañeros, pero a diferencia de los humanos, el tiempo pasa lentamente para ella. Reflexiona sobre el significado de la vida y la muerte mientras emprende un nuevo viaje.',
    type: 'TV',
    episodes: 28,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2023-09-29',
    airedTo: '2024-03-22',
    duration: '25 min per ep',
    rating: 'PG-13',
    score: 9.6,
    scoredBy: 450000,
    rank: 2,
    popularity: 8,
    members: 1500000,
    season: 'fall',
    year: 2023,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=bTEByKetCgE',
    genres: ['Adventure', 'Drama', 'Fantasy'],
  },
  {
    id: 8,
    malId: 30276,
    title: 'One Punch Man',
    titleEnglish: 'One Punch Man',
    titleJapanese: 'ワンパンマン',
    synopsis:
      'Saitama es un héroe que puede derrotar a cualquier enemigo de un solo golpe. Aburrido por su abrumadora fuerza, busca un oponente que pueda darle una pelea digna.',
    type: 'TV',
    episodes: 12,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2015-10-05',
    airedTo: '2015-12-21',
    duration: '24 min per ep',
    rating: 'R - 17+',
    score: 9.0,
    scoredBy: 750000,
    rank: 20,
    popularity: 7,
    members: 2200000,
    season: 'fall',
    year: 2015,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1982/132339.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Poo5lqo0Gik',
    genres: ['Action', 'Comedy', 'Parody', 'Sci-Fi'],
  },
  {
    id: 9,
    malId: 16498,
    title: 'Attack on Titan',
    titleEnglish: 'Attack on Titan',
    titleJapanese: '進撃の巨人',
    synopsis:
      'Eren Jaeger jura eliminar a todos los titanes después de que un titán devora a su madre y destruye su ciudad. Se une al Cuerpo de Exploración para luchar contra estas criaturas gigantes.',
    type: 'TV',
    episodes: 25,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2013-04-07',
    airedTo: '2013-09-29',
    duration: '24 min per ep',
    rating: 'R - 17+',
    score: 9.3,
    scoredBy: 1050000,
    rank: 6,
    popularity: 9,
    members: 2900000,
    season: 'spring',
    year: 2013,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1491/132864.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=1XBTbVv6jTk',
    genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
  },
  {
    id: 10,
    malId: 28851,
    title: 'Koe no Katachi',
    titleEnglish: 'A Silent Voice',
    titleJapanese: '聲の形',
    synopsis:
      'Shoya Ishida, un antiguo acosador de una compañera sorda llamada Shoko Nishimiya, busca redimirse años después al reencontrarse con ella. Una historia sobre el perdón y la superación personal.',
    type: 'Movie',
    episodes: 1,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2016-09-17',
    duration: '130 min',
    rating: 'PG-13',
    score: 9.3,
    scoredBy: 680000,
    rank: 7,
    popularity: 10,
    members: 1800000,
    season: 'summer',
    year: 2016,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1122/138384.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=nfK6UgB2vSU',
    genres: ['Drama', 'Romance', 'Slice of Life'],
  },
  {
    id: 11,
    malId: 3786,
    title: 'Evangelion: 1.0 You Are (Not) Alone',
    titleEnglish: 'Evangelion: 1.0 You Are (Not) Alone',
    titleJapanese: 'ヱヴァンゲリヲン新劇場版:序',
    synopsis:
      'Reconstrucción de la serie original de Neon Genesis Evangelion. Shinji Ikari es reclutado por su padre para pilotar un gigantesco robot biomecánico llamado Evangelion para defender la humanidad de misteriosos ángeles.',
    type: 'Movie',
    episodes: 1,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2007-09-01',
    duration: '98 min',
    rating: 'R - 17+',
    score: 8.5,
    scoredBy: 250000,
    rank: 50,
    popularity: 25,
    members: 800000,
    season: 'summer',
    year: 2007,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1123/133990.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=13nSISBD1hc',
    genres: ['Action', 'Mecha', 'Psychological', 'Sci-Fi'],
  },
  {
    id: 12,
    malId: 37430,
    title: 'Mob Psycho 100 II',
    titleEnglish: 'Mob Psycho 100 II',
    titleJapanese: 'モブサイコ100 Ⅱ',
    synopsis:
      'Shigeo "Mob" Kageyama continúa navegando su vida como estudiante de secundaria mientras desarrolla sus poderes psíquicos. Esta temporada explora más profundamente su crecimiento emocional.',
    type: 'TV',
    episodes: 13,
    status: 'Finished Airing',
    airing: false,
    airedFrom: '2019-01-07',
    airedTo: '2019-04-01',
    duration: '24 min per ep',
    rating: 'PG-13',
    score: 9.1,
    scoredBy: 350000,
    rank: 10,
    popularity: 15,
    members: 1200000,
    season: 'winter',
    year: 2019,
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1918/96303.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=9kYdEf7Lz-I',
    genres: ['Action', 'Comedy', 'Slice of Life', 'Supernatural'],
  },
];

const mockEpisodes: Record<number, Episode[]> = {
  1: [
    {
      id: 1,
      malId: 1,
      animeId: 1,
      number: 1,
      title: 'El Despertar',
      aired: '2024-01-06',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 2,
      malId: 2,
      animeId: 1,
      number: 2,
      title: 'Mazmorra Doble',
      aired: '2024-01-13',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 3,
      malId: 3,
      animeId: 1,
      number: 3,
      title: 'El Nevado',
      aired: '2024-01-20',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 4,
      malId: 4,
      animeId: 1,
      number: 4,
      title: 'Renacer',
      aired: '2024-01-27',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 5,
      malId: 5,
      animeId: 1,
      number: 5,
      title: 'Una Nueva Fuerza',
      aired: '2024-02-03',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 6,
      malId: 6,
      animeId: 1,
      number: 6,
      title: 'El Castillo del Demonio',
      aired: '2024-02-10',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 7,
      malId: 7,
      animeId: 1,
      number: 7,
      title: 'El Guerrero Más Fuerte',
      aired: '2024-02-17',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 8,
      malId: 8,
      animeId: 1,
      number: 8,
      title: 'La Asociación de Cazadores',
      aired: '2024-02-24',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 9,
      malId: 9,
      animeId: 1,
      number: 9,
      title: 'Invasión',
      aired: '2024-03-02',
      filler: false,
      recap: false,
      duration: 1440,
    },
    {
      id: 10,
      malId: 10,
      animeId: 1,
      number: 10,
      title: 'El Portal Rojo',
      aired: '2024-03-09',
      filler: false,
      recap: false,
      duration: 1440,
    },
  ],
  7: [
    {
      id: 11,
      malId: 1,
      animeId: 7,
      number: 1,
      title: 'El Fin del Viaje',
      aired: '2023-09-29',
      filler: false,
      recap: false,
      duration: 1500,
    },
    {
      id: 12,
      malId: 2,
      animeId: 7,
      number: 2,
      title: 'Magia y Recuerdos',
      aired: '2023-10-06',
      filler: false,
      recap: false,
      duration: 1500,
    },
    {
      id: 13,
      malId: 3,
      animeId: 7,
      number: 3,
      title: 'La Maga Solitaria',
      aired: '2023-10-13',
      filler: false,
      recap: false,
      duration: 1500,
    },
    {
      id: 14,
      malId: 4,
      animeId: 7,
      number: 4,
      title: 'El País de los Elfos',
      aired: '2023-10-20',
      filler: false,
      recap: false,
      duration: 1500,
    },
    {
      id: 15,
      malId: 5,
      animeId: 7,
      number: 5,
      title: 'Aprendiz de Maga',
      aired: '2023-10-27',
      filler: false,
      recap: false,
      duration: 1500,
    },
    {
      id: 16,
      malId: 6,
      animeId: 7,
      number: 6,
      title: 'El Grimorio Antiguo',
      aired: '2023-11-03',
      filler: false,
      recap: false,
      duration: 1500,
    },
  ],
};

const mockComments: Record<number, Comment[]> = {
  1: [
    {
      id: 1,
      content: 'La animación es espectacular, el mejor anime del año.',
      createdAt: '2024-02-15T14:30:00Z',
      user: { id: 1, name: 'Juan Pérez' },
    },
    {
      id: 2,
      content:
        'Sung Jin-Woo es un personaje increíble, la evolución es brutal.',
      createdAt: '2024-03-10T10:00:00Z',
      user: { id: 2, name: 'Ana López' },
    },
    {
      id: 3,
      content:
        'Ojalá la segunda temporada salga pronto, el final me dejó con ganas de más.',
      createdAt: '2024-04-01T18:00:00Z',
      user: { id: 3, name: 'Carlos García' },
    },
  ],
  7: [
    {
      id: 4,
      content: 'Una obra maestra, cada episodio es una experiencia única.',
      createdAt: '2024-01-20T12:00:00Z',
      user: { id: 1, name: 'Juan Pérez' },
    },
    {
      id: 5,
      content:
        'La banda sonora es increíble, complementa perfectamente la historia.',
      createdAt: '2024-02-05T09:30:00Z',
      user: { id: 3, name: 'Carlos García' },
    },
  ],
};

const mockFavorites: Favorite[] = [
  {
    id: 1,
    animeId: 1,
    title: 'Solo Leveling',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1803/131212.jpg',
    addedAt: '2026-03-10T15:00:00Z',
  },
  {
    id: 2,
    animeId: 7,
    title: "Frieren: Beyond Journey's End",
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    addedAt: '2026-04-05T10:30:00Z',
  },
  {
    id: 3,
    animeId: 4,
    title: 'Steins;Gate',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
    addedAt: '2026-05-20T08:00:00Z',
  },
  {
    id: 4,
    animeId: 10,
    title: 'A Silent Voice',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1122/138384.jpg',
    addedAt: '2026-06-01T20:00:00Z',
  },
];

const mockHistory: WatchHistoryEntry[] = [
  {
    id: 1,
    animeId: 1,
    animeTitle: 'Solo Leveling',
    animeImage: 'https://cdn.myanimelist.net/images/anime/1803/131212.jpg',
    episodeId: 10,
    episodeNumber: 10,
    episodeTitle: 'El Portal Rojo',
    watchedAt: '2026-06-22T20:00:00Z',
    progress: 100,
  },
  {
    id: 2,
    animeId: 1,
    animeTitle: 'Solo Leveling',
    animeImage: 'https://cdn.myanimelist.net/images/anime/1803/131212.jpg',
    episodeId: 9,
    episodeNumber: 9,
    episodeTitle: 'Invasión',
    watchedAt: '2026-06-21T19:30:00Z',
    progress: 100,
  },
  {
    id: 3,
    animeId: 7,
    animeTitle: "Frieren: Beyond Journey's End",
    animeImage: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    episodeId: 16,
    episodeNumber: 6,
    episodeTitle: 'El Grimorio Antiguo',
    watchedAt: '2026-06-20T21:00:00Z',
    progress: 100,
  },
  {
    id: 4,
    animeId: 7,
    animeTitle: "Frieren: Beyond Journey's End",
    animeImage: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    episodeId: 15,
    episodeNumber: 5,
    episodeTitle: 'Aprendiz de Maga',
    watchedAt: '2026-06-19T20:00:00Z',
    progress: 100,
  },
  {
    id: 5,
    animeId: 7,
    animeTitle: "Frieren: Beyond Journey's End",
    animeImage: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    episodeId: 14,
    episodeNumber: 4,
    episodeTitle: 'El País de los Elfos',
    watchedAt: '2026-06-18T19:00:00Z',
    progress: 100,
  },
  {
    id: 6,
    animeId: 4,
    animeTitle: 'Steins;Gate',
    animeImage: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
    watchedAt: '2026-06-15T18:00:00Z',
    progress: 45,
  },
];

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), 300 + Math.random() * 400),
  );
}

export const mockApi = {
  async getProfile(): Promise<User> {
    return await delay({ ...mockUser });
  },

  async getAnimes(
    page = 1,
    filters?: { genre?: string; year?: number; type?: string },
  ): Promise<PaginatedResponse<Anime>> {
    let filtered = [...mockAnimes];

    const genreFilter = filters?.genre?.toLowerCase()
    if (genreFilter) {
      filtered = filtered.filter((animes) =>
        animes.genres.some((g) => g.toLowerCase() === genreFilter),
      );
    }

    const yearFilter = filters?.year
    if (yearFilter) {
      filtered = filtered.filter((a) => a.year === yearFilter);
    }

    const typeFilter = filters?.type
    if (typeFilter) {
      filtered = filtered.filter((a) => a.type === typeFilter);
    }

    // Pagination
    const limit = 8;
    const totalPages = Math.ceil(filtered.length / limit);
    const start = (page - 1) * limit;
    const results = filtered.slice(start, start + limit);
    return await delay({ page, totalPages, results });
  },

  async getAnimeById(id: number): Promise<Anime | null> {
    const anime = mockAnimes.find((a) => a.id === id) ?? null;
    return await delay(anime);
  },

  async getEpisodes(animeId: number): Promise<Episode[]> {
    return await delay(mockEpisodes[animeId] ?? []);
  },

  async getComments(animeId: number): Promise<Comment[]> {
    return await delay(mockComments[animeId] ?? []);
  },

  async addComment(animeId: number, content: string): Promise<Comment> {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      user: { id: mockUser.id, name: mockUser.name },
    };

    if (!mockComments[animeId]) {
      mockComments[animeId] = [];
    }
    mockComments[animeId].push(newComment);

    return await delay(newComment);
  },

  // It does not actually delete the comment from the mock data, but simulates
  // a successful deletion response.
  async deleteComment(_commentId: number): Promise<{ message: string }> {
    return await delay({ message: 'Comentario eliminado' });
  },

  async getFavorites(): Promise<Favorite[]> {
    return await delay([...mockFavorites]);
  },

  async addFavorite(
    animeId: number,
    animeTitle: string,
    animeImage?: string,
  ): Promise<Favorite> {
    const newFav: Favorite = {
      id: Date.now(),
      animeId,
      title: animeTitle,
      imageUrl: animeImage,
      addedAt: new Date().toISOString(),
    };

    mockFavorites.push(newFav);
    return await delay(newFav);
  },

  async removeFavorite(animeId: number): Promise<{ message: string }> {
    const idx = mockFavorites.findIndex((f) => f.animeId === animeId);
    if (idx !== -1) mockFavorites.splice(idx, 1);
    return await delay({ message: 'Anime eliminado de favoritos' });
  },

  async getHistory(): Promise<WatchHistoryEntry[]> {
    return await delay([...mockHistory]);
  },
};
