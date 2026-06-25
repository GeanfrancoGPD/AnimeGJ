CREATE DATABASE  anime_db;

-- USUARIOS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user' | 'admin'
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ANIMES (campos alineados a Jikan API v4)
CREATE TABLE animes (
    id SERIAL PRIMARY KEY,
    mal_id INTEGER UNIQUE,              -- id del anime en MyAnimeList (clave para sincronizar con Jikan)
    title VARCHAR(255) NOT NULL,
    title_english VARCHAR(255),
    title_japanese VARCHAR(255),
    synopsis TEXT,
    type VARCHAR(20),                   -- TV, Movie, OVA, ONA, Special, Music
    source VARCHAR(50),                 -- Manga, Light novel, Original, Game...
    episodes INTEGER,
    status VARCHAR(30),                 -- "Finished Airing", "Currently Airing", "Not yet aired"
    airing BOOLEAN DEFAULT false,
    aired_from DATE,
    aired_to DATE,
    duration VARCHAR(50),               -- ej: "24 min per ep"
    rating VARCHAR(50),                 -- ej: "PG-13", "R - 17+"
    score NUMERIC(4,2),
    scored_by INTEGER,
    rank INTEGER,
    popularity INTEGER,
    members INTEGER,
    season VARCHAR(10),                 -- winter | spring | summer | fall
    year INTEGER,
    image_url TEXT,
    trailer_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- GÉNEROS
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    mal_id INTEGER UNIQUE,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- ANIME <-> GÉNERO (N:M)
CREATE TABLE anime_genres (
    anime_id INTEGER NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
    genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (anime_id, genre_id)
);

-- EPISODIOS
CREATE TABLE episodes (
    id SERIAL PRIMARY KEY,
    mal_id INTEGER,
    anime_id INTEGER NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
    number INTEGER NOT NULL,
    title VARCHAR(255),
    title_japanese VARCHAR(255),
    title_romanji VARCHAR(255),
    aired DATE,
    filler BOOLEAN DEFAULT false,
    recap BOOLEAN DEFAULT false,
    duration INTEGER,                   -- segundos
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (anime_id, number)
);

-- FAVORITOS (relación usuario <-> anime)
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    anime_id INTEGER NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, anime_id)           -- evita duplicados del mismo favorito
);

-- COMENTARIOS (relación usuario <-> anime)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    anime_id INTEGER NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_anime ON favorites(anime_id);
CREATE INDEX idx_comments_anime ON comments(anime_id);
CREATE INDEX idx_episodes_anime ON episodes(anime_id);
CREATE INDEX idx_animes_mal_id ON animes(mal_id);
