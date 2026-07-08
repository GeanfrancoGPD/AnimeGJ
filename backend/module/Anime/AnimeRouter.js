import express from "express";
import AnimeBO from "./AnimeBO.js";
import DB from "../../components/DBComponent.js";
import authMiddleware from "./AnimeMiddleware.js";

const router = express.Router();
const animeBO = new AnimeBO();

// ==================== AUTENTICACIÓN ====================
router.post("/login", async (req, res) => {
  await animeBO.login(req, res);
});

router.post("/register", async (req, res) => {
  await animeBO.register(req, res);
});

router.post("/logout", async (req, res) => {
  await animeBO.logout(req, res);
});

router.delete("/user", authMiddleware, async (req, res) => {
  await animeBO.deleteUserAccount(req, res);
});

router.get("/users", async (req, res) => {
  await animeBO.getAllUsers(req, res);
});

router.get("/auth/me", authMiddleware, async (req, res) => {
  return await animeBO.getCurrentUser(req, res);
});

router.get("/all", async (req, res) => {
  return await animeBO.getAnimeAll(req, res);
});

router.get("/genres", async (req, res) => {
  return await animeBO.getGenres(req, res);
});

router.get("/search", async (req, res) => {
  return await animeBO.searchAnimes(req, res);
});

router.get("/:id", async (req, res) => {
  return await animeBO.getAnimeById(req, res);
});

router.get("/:id/episodes", async (req, res) => {
  return await animeBO.getEpisodeDetails(req, res);
});

router.post("/favorito", authMiddleware, async (req, res) => {
  return await animeBO.addFavorite(req, res);
});

router.delete("/favorito", authMiddleware, async (req, res) => {
  return await animeBO.removeFavorite(req, res);
});

router.get("/favoritos", authMiddleware, async (req, res) => {
  return await animeBO.getFavoriteAnimes(req, res);
});

router.post("/comentarios", authMiddleware, async (req, res) => {
  return await animeBO.addComment(req, res);
});

router.delete("/comentarios", authMiddleware, async (req, res) => {
  return await animeBO.removeComment(req, res);
});

router.get("/comentarios", authMiddleware, async (req, res) => {
  return await animeBO.getComments(req, res);
});

export default router;
