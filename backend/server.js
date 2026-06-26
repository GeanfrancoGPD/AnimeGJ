import app from "./util/middleware.js";
import AnimeRouter from "./module/Anime/AnimeRouter.js";
app.use("/api/animes", AnimeRouter);

const port = process.env.PORT || 5000;

// --- START ---
app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});
