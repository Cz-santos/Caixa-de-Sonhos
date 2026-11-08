import { con } from "../utils/connection.js";

export async function saveDoacao(doacao) {
    const command = `
        INSERT INTO doacao (
            id_doador,
            id_beneficiario,
            id_brinquedo
        )
        VALUES (?, ?, ?)
    `;

    const [result] = await con.query(command, [
        doacao.id_doador,
        doacao.id_beneficiario ?? null,
        doacao.id_brinquedo
    ]);

    return result.insertId;
}

export async function getDoacao(id) {
    const command = `
        SELECT *
        FROM doacao
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);

    return result[0];
}

export async function listDoacoes() {
    const command = `
        SELECT
            d.id,
            d.id_doador,
            d.id_beneficiario,
            d.id_brinquedo,
            d.data_retirada,
            b.nome AS nome_brinquedo,
            u.nome AS nome_doador
        FROM doacao d
        INNER JOIN brinquedo b ON d.id_brinquedo = b.id
        INNER JOIN usuario u ON d.id_doador = u.id
    `;

    const [result] = await con.query(command);

    return result;
}

export async function updateDoacao(id, doacao) {
    const command = `
        UPDATE doacao
        SET id_beneficiario = ?, data_retirada = ?
        WHERE id = ?
    `;

    const [result] = await con.query(command, [
        doacao.id_beneficiario,
        doacao.data_retirada,
        id
    ]);

    return result.affectedRows;
}

export async function deleteDoacao(id) {
    const command = `
        DELETE FROM doacao
        WHERE id = ?
    `;

    const [result] = await con.query(command, [id]);

    return result.affectedRows;
}

export async function getUltimaDoacaoBeneficiario(id_usuario) {
    const command = `
        SELECT data_retirada
        FROM doacao
        WHERE id_beneficiario = ?
        AND data_retirada IS NOT NULL
        ORDER BY data_retirada DESC
        LIMIT 1
    `;

    const [result] = await con.query(command, [id_usuario]);

    return result[0];
}