
import { con } from "../utils/connection.js";

export async function saveBrinquedo(brinquedo) {
    const command = `
        INSERT INTO brinquedo (nome, descricao, foto_url)
        VALUES (?, ?, ?)
    `;

    const [result] = await con.query(command, [
        brinquedo.nome,
        brinquedo.descricao,
        brinquedo.foto_url
    ]);

    return result.insertId;
}

export async function getBrinquedo(id) {
    const command = `
        SELECT *
        FROM brinquedo
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);
    return result[0];
}

export async function listBrinquedos() {
    const command = `
        SELECT *
        FROM brinquedo
    `;

    const [result] = await con.query(command);
    return result;
}

export async function listBrinquedosDisponiveis() {
    const command = `
        SELECT *
        FROM brinquedo
        WHERE status = 'disponivel'
    `;

    const [result] = await con.query(command);
    return result;
}

export async function updateBrinquedo(id, brinquedo) {
    const command = `
        UPDATE brinquedo
        SET nome = ?, descricao = ?, foto_url = ?, status = ?
        WHERE id = ?
    `;

    const [result] = await con.query(command, [
        brinquedo.nome,
        brinquedo.descricao,
        brinquedo.foto_url,
        brinquedo.status,
        id
    ]);

    return result.affectedRows;
}

export async function deleteBrinquedo(id) {
    const command = `
        DELETE FROM brinquedo
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);
    return result.affectedRows;
}
