# AnimeVerse API

Sistema de catálogo y seguimiento de anime desarrollado con React, Mantine, Node.js, Express y PostgreSQL.

## Tecnologías

### Frontend

- React
- Mantine UI
- React Router
- Axios

### Backend

- Node.js
- Express
- express-session
- bcrypt

### Base de Datos

- PostgreSQL

---

# Modelo de Datos

## Diagrama de relaciones

```Mermaid
erDiagram

    USERS ||--o{ FAVORITES : tiene
    USERS ||--o{ COMMENTS : escribe

    ANIMES ||--o{ FAVORITES : favorito
    ANIMES ||--o{ COMMENTS : recibe
    ANIMES ||--o{ EPISODES : contiene

    ANIMES ||--o{ ANIME_GENRES : relacion
    GENRES ||--o{ ANIME_GENRES : relacion

    USERS {
        int id PK
        varchar name
        varchar email
        varchar password_hash
        varchar role
        timestamp created_at
    }

    ANIMES {
        int id PK
        int mal_id
        varchar title
        varchar title_english
        varchar title_japanese
        text synopsis
        varchar type
        varchar source
        int episodes
        varchar status
        boolean airing
        date aired_from
        date aired_to
        varchar duration
        varchar rating
        numeric score
        int scored_by
        int rank
        int popularity
        int members
        varchar season
        int year
        text image_url
        text trailer_url
        timestamp created_at
        timestamp updated_at
    }

    GENRES {
        int id PK
        int mal_id
        varchar name
    }

    ANIME_GENRES {
        int anime_id FK
        int genre_id FK
    }

    EPISODES {
        int id PK
        int mal_id
        int anime_id FK
        int number
        varchar title
        date aired
        boolean filler
        boolean recap
        int duration
    }

    FAVORITES {
        int id PK
        int user_id FK
        int anime_id FK
        timestamp created_at
    }

    COMMENTS {
        int id PK
        int user_id FK
        int anime_id FK
        text content
        timestamp created_at
        timestamp updated_at
    }
```

## Script SQL (PostgreSQL)

```sql
-- USUARIOS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
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

```

---

# Autenticación

## Registro

### POST /api/auth/register

### Request

```json
{
  "name": "Juan Pérez",
  "email": "juan@gmail.com",
  "password": "12345678"
}
```

### Response 201

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@gmail.com"
  }
}
```

### Response 400

```json
{
  "message": "El correo ya existe"
}
```

---

## Login

### POST /api/auth/login

### Request

```json
{
  "email": "juan@gmail.com",
  "password": "12345678"
}
```

Al validar credenciales, el backend hace `req.session.userId = user.id` (y `req.session.role = user.role`). Express-session se encarga de mandar el header `Set-Cookie: connect.sid=...` en la respuesta — el frontend no tiene que guardar ni mandar nada manualmente, solo usar `axios.defaults.withCredentials = true` (o `{ withCredentials: true }` por request).

### Response 200

```json
{
  "message": "Sesión iniciada correctamente",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "role": "user"
  }
}
```

### Response 401

```json
{
  "message": "Credenciales inválidas"
}
```

---

## Logout

### POST /api/auth/logout

**Requiere sesión activa.**

Destruye la sesión en el servidor (`req.session.destroy()`) y limpia la cookie.

### Response 200

```json
{
  "message": "Sesión cerrada correctamente"
}
```

---

## Quién soy _(útil para que el frontend sepa si hay sesión activa al cargar la app)_

### GET /api/auth/me

### Response 200

```json
{
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "role": "user"
  }
}
```

### Response 401 (no hay sesión / cookie expirada)

```json
{
  "message": "No autenticado"
}
```

---

# Animes

## Obtener todos los animes

### GET /api/animes

### Body Params

```js
{
  "page": 1,        // número de página (default: 1)
  "limit": 20,      // cantidad de resultados por página (default: 20)
  "genre": "Action", // filtrar por género (opcional)
  "year": 2024      // filtrar por año de estreno (opcional)
}

```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "mal_id": 64467,
      "title": "Sudachi no Maoujou",
      "title_english": null,
      "title_japanese": "すだち de la Maoujou",
      "synopsis": "After the hero defeated the demon lord...",
      "type": "TV",
      "source": "Manga",
      "episodes": null,
      "status": "Not yet aired",
      "airing": false,
      "aired_from": "2027-01-01T04:00:00.000Z",
      "aired_to": null,
      "duration": "Unknown",
      "rating": null,
      "score": "0.00",
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 1,
      "season": "winter",
      "year": 2027,
      "image_url": "https://cdn.myanimelist.net/images/anime/1934/158698l.jpg",
      "trailer_url": null,
      "created_at": "2026-06-25T20:12:38.210Z",
      "updated_at": "2026-06-25T20:12:38.210Z"
    }
  ]
}
```

---

## Obtener anime por ID

### GET /api/animes/:id

### Response

```json
{
  "id": 1,
  "mal_id": 52299,
  "title": "Solo Leveling",
  "title_english": "Solo Leveling",
  "title_japanese": "俺だけレベルアップな件",
  "synopsis": "Historia...",
  "type": "TV",
  "episodes": 12,
  "status": "Finished Airing",
  "aired_from": "2024-01-06",
  "aired_to": "2024-03-23",
  "score": 9.4,
  "season": "winter",
  "year": 2024,
  "image_url": "image.jpg",
  "genres": ["Action", "Fantasy"]
}
```

---

## Crear Anime

> Recomendado restringir con un middleware que chequee `req.session.role === "admin"`.

### POST /api/animes

### Request

```json
{
  "malId": 52299,
  "title": "Solo Leveling",
  "synopsis": "Historia...",
  "releaseYear": 2024,
  "status": "Ongoing",
  "score": 9.4,
  "genres": ["Action", "Fantasy"]
}
```

### Response

```json
{
  "message": "Anime creado correctamente"
}
```

---

## Actualizar Anime

### PUT /api/animes/:id

### Response

```json
{
  "message": "Anime actualizado"
}
```

---

## Eliminar Anime

### DELETE /api/animes/:id

### Response

```json
{
  "message": "Anime eliminado"
}
```

---

# Episodios

## Obtener episodios

### GET /api/animes/:id/episodes

### Response

```json
[
  {
    "id": 1,
    "malId": 1,
    "number": 1,
    "title": "El despertar",
    "aired": "2024-01-06",
    "filler": false,
    "recap": false,
    "duration": 1440
  }
]
```

---

## Crear episodio

### POST /api/episodes

### Request

```json
{
  "animeId": 1,
  "number": 1,
  "title": "El despertar",
  "duration": 24
}
```

---

# Favoritos

> Requiere sesión activa (cookie). El `userId` **no se manda en el body**: se toma de `req.session.userId` y se guarda como FK contra la tabla `favorites`.

## Agregar favorito

### POST /api/favorites

**Requiere cookie de sesión** (se envía sola si el frontend usa `withCredentials: true`).

### Request

```json
{
  "animeId": 1
}
```

### Response 201

```json
{
  "message": "Anime agregado a favoritos",
  "favorite": {
    "id": 10,
    "userId": 1,
    "animeId": 1,
    "createdAt": "2026-06-22T10:00:00Z"
  }
}
```

### Response 401 (no hay sesión activa)

```json
{
  "message": "No autenticado"
}
```

### Response 409 (ya existe, por el UNIQUE(user_id, anime_id))

```json
{
  "message": "Este anime ya está en tus favoritos"
}
```

---

## Obtener favoritos

### GET /api/favorites

**Requiere cookie de sesión.**

Internamente: `SELECT ... FROM favorites WHERE user_id = req.session.userId`.

### Response

```json
[
  {
    "id": 10,
    "animeId": 1,
    "title": "Solo Leveling",
    "image_url": "image.jpg",
    "addedAt": "2026-06-22T10:00:00Z"
  }
]
```

---

## Quitar favorito

### DELETE /api/favorites/:animeId

**Requiere cookie de sesión.**

### Response

```json
{
  "message": "Anime eliminado de favoritos"
}
```

---

# Comentarios

> Requiere sesión activa. El `userId` se toma de `req.session.userId`, igual que en favoritos.

## Crear comentario

### POST /api/comments

**Requiere cookie de sesión.**

### Request

```json
{
  "animeId": 1,
  "content": "Excelente anime"
}
```

### Response 201

```json
{
  "message": "Comentario agregado",
  "comment": {
    "id": 5,
    "userId": 1,
    "animeId": 1,
    "content": "Excelente anime",
    "createdAt": "2026-06-22T10:00:00Z"
  }
}
```

---

## Obtener comentarios

### GET /api/animes/:id/comments

Internamente: `JOIN comments c ON c.user_id = users.id WHERE c.anime_id = :id`.

### Response

```json
[
  {
    "id": 5,
    "content": "Excelente anime",
    "createdAt": "2026-06-22T10:00:00Z",
    "user": {
      "id": 1,
      "name": "Juan"
    }
  }
]
```

---

## Eliminar comentario

### DELETE /api/comments/:id

**Requiere cookie de sesión.**

Solo permite borrar si `comment.user_id === req.session.userId` o `req.session.role === "admin"`.

### Response

```json
{
  "message": "Comentario eliminado"
}
```

---

# Compatibilidad con Jikan API (https://docs.api.jikan.moe)

Jikan es solo lectura (no requiere API key) y expone catálogo de MyAnimeList. La idea es usar `mal_id` como clave para sincronizar/importar datos hacia tu tabla `animes`, sin pisar tus propios registros si el usuario edita algo localmente.

| Campo en Jikan (`/v4/anime/:id`) | Campo en tu tabla `animes`                 |
| -------------------------------- | ------------------------------------------ |
| `mal_id`                         | `mal_id` (UNIQUE, clave de sincronización) |
| `title`                          | `title`                                    |
| `title_english`                  | `title_english`                            |
| `title_japanese`                 | `title_japanese`                           |
| `synopsis`                       | `synopsis`                                 |
| `type`                           | `type`                                     |
| `source`                         | `source`                                   |
| `episodes`                       | `episodes`                                 |
| `status`                         | `status`                                   |
| `airing`                         | `airing`                                   |
| `aired.from` / `aired.to`        | `aired_from` / `aired_to`                  |
| `duration`                       | `duration`                                 |
| `rating`                         | `rating`                                   |
| `score`                          | `score`                                    |
| `scored_by`                      | `scored_by`                                |
| `rank`                           | `rank`                                     |
| `popularity`                     | `popularity`                               |
| `members`                        | `members`                                  |
| `season`                         | `season`                                   |
| `year`                           | `year`                                     |
| `images.jpg.image_url`           | `image_url`                                |
| `trailer.url`                    | `trailer_url`                              |
| `genres[].name`                  | tabla `genres` + `anime_genres`            |

Para episodios (`/v4/anime/:id/episodes`): `mal_id`, `title`, `aired`, `filler`, `recap` mapean directo a las columnas de la tabla `episodes`.

### Endpoint sugerido para importar desde Jikan

```
POST /api/animes/import/:malId
```

El backend llama a `https://api.jikan.moe/v4/anime/:malId/full`, mapea la respuesta con la tabla de arriba y hace un `INSERT ... ON CONFLICT (mal_id) DO UPDATE` para no duplicar si ya existe. Como Jikan limita a pocas requests por segundo, conviene cachear localmente (tu propia tabla ya hace de caché) en vez de pedir el dato cada vez.
