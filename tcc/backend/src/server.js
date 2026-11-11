
import "dotenv/config";
import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import brinquedoRoutes from "./routes/brinquedoRoutes.js";
import doacaoRoutes from "./routes/doacaoRoutes.js";
import favoritoRoutes from "./routes/favoritoRoutes.js";

const app = express();

console.log("Aplicação Express criada");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(usuarioRoutes);
app.use(brinquedoRoutes);
app.use(doacaoRoutes);
app.use(favoritoRoutes);

const PORT = process.env.PORT || 5002;

console.log("Endereço:", `http://127.0.0.1:${PORT}`);

app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor iniciado!");
    console.log("Porta:", PORT);
});

