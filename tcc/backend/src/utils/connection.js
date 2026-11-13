import "dotenv/config";
import mysql from "mysql2/promise";

const obrigatorias = ["DB_HOST", "DB_USER", "DB_NAME"];

for (const campo of obrigatorias) {
    if (!process.env[campo]) {
        throw new Error(`Configuração ausente no .env do backend: ${campo}`);
    }
}

export const con = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("Configuração do MySQL carregada.");
