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
  try {
    const usuarioId = req.body.id ?? resolveUserId(req);

    if (!usuarioId) {
      return res
        .status(400)
        .json({ success: false, message: "Usuario inválido" });
    }
    const data = await recipeRepository.deleteUserAccount(usuarioId);
    req.session.destroy(() => {});
    return res.json({ success: true, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "No se pudo eliminar la cuenta" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const data = await recipeRepository.getAllUsers();
    return res.json({ success: true, data: data ?? [] });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No se pudieron cargar los usuarios",
    });
  }
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
