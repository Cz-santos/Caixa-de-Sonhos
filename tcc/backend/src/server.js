import "dotenv/config";
import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import brinquedoRoutes from "./routes/brinquedoRoutes.js";
import doacaoRoutes from "./routes/doacaoRoutes.js";
import favoritoRoutes from "./routes/favoritoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(usuarioRoutes);
app.use(brinquedoRoutes);
app.use(doacaoRoutes);
app.use(favoritoRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    // teste do git
    console.log(`Servidor rodando na porta ${PORT}`);
});