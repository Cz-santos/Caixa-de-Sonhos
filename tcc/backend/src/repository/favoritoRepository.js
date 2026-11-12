
import { con } from "../utils/connection.js";

export async function saveFavorito(favorito) {
    const verificar = `
        SELECT id
        FROM favorito
        WHERE id_usuario = ? AND id_brinquedo = ?
    `;

    const [existente] = await con.query(verificar, [
        favorito.id_usuario,
        favorito.id_brinquedo
    ]);

    if (existente.length > 0) {
        throw new Error("Esse brinquedo já está nos favoritos");
    }

    const command = `
        INSERT INTO favorito (id_usuario, id_brinquedo)
        VALUES (?, ?)
    `;

    const [result] = await con.query(command, [
        favorito.id_usuario,
        favorito.id_brinquedo
    ]);

    return result.insertId;
}

export async function getFavorito(id) {
    const command = `
        SELECT *
        FROM favorito
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);
    return result[0];
}

export async function listFavoritos(id_usuario) {
    const command = `
        SELECT
            f.id,
            f.id_usuario,
            f.id_brinquedo,
            b.nome,
            b.descricao,
            b.foto_url,
            b.status
        FROM favorito f
        INNER JOIN brinquedo b ON f.id_brinquedo = b.id
        WHERE f.id_usuario = ?
    `;

    const [result] = await con.query(command, [id_usuario]);
    return result;
}

export async function deleteFavorito(id) {
    const command = `
        DELETE FROM favorito
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);
    return result.affectedRows;
}

export async function updateStatusFavorito(id, status) {
    const command = `
        UPDATE favorito
        SET status = ?
        WHERE id = ?
    `;

    const [result] = await con.query(command, [status, id]);

    return result.affectedRows;
}