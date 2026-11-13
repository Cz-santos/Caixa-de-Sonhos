import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { con } from "./utils/connection.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import brinquedoRoutes from "./routes/brinquedoRoutes.js";
import doacaoRoutes from "./routes/doacaoRoutes.js";
import favoritoRoutes from "./routes/favoritoRoutes.js";

const app = express();
const PORT = Number(process.env.PORT || 5002);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.get("/health", async (req, res) => {
    try {
        await con.query("SELECT 1");
        res.status(200).json({ status: "ok", banco: "conectado" });
    } catch (error) {
        console.error("Falha ao verificar o MySQL:", error.message);
        res.status(503).json({ status: "erro", banco: "indisponivel" });
    }
});

app.use(usuarioRoutes);
app.use(brinquedoRoutes);
app.use(doacaoRoutes);
app.use(favoritoRoutes);

app.use((err, req, res, next) => {
    console.error("Erro na API:", err.message);
    res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API Caixa de Sonhos rodando na porta ${PORT}`);
    console.log(`Teste de saúde: http://localhost:${PORT}/health`);
});
