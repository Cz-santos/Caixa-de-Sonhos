
import { con } from "../utils/connection.js";

export async function saveUsuario(usuario) {
    const command = `
        INSERT INTO usuario (nome, email, senha, foto)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await con.query(command, [
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.foto ?? null
    ]);

    return result.insertId;
}

export async function getUsuario(id) {
    const command = `
        SELECT id, nome, email, foto, data_cadastro
        FROM usuario
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);

    return result[0];
}

export async function getUsuarioByEmail(email) {
    const command = `
        SELECT id, nome, email, senha, foto, data_cadastro
        FROM usuario
        WHERE email = ?
    `;

    const [result] = await con.query(command, [email]);

    return result[0];
}

export async function listUsuarios() {
    const command = `
        SELECT id, nome, email, foto, data_cadastro
        FROM usuario
    `;

    const [result] = await con.query(command);

    return result;
}

export async function updateUsuario(id, usuario) {
    const command = `
        UPDATE usuario
        SET nome = COALESCE(?, nome),
            foto = CASE WHEN ? = 1 THEN ? ELSE foto END
        WHERE id = ?
    `;

    const possuiFoto = Object.prototype.hasOwnProperty.call(usuario, "foto");

    const [result] = await con.query(command, [
        usuario.nome ?? null,
        possuiFoto ? 1 : 0,
        usuario.foto ?? null,
        id
    ]);

    return result.affectedRows;
}

export async function deleteUsuario(id) {
    const command = `
        DELETE FROM usuario
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);

    return result.affectedRows;
}
