
import * as repository from "../repository/favoritoRepository.js";
import { con } from "../utils/connection.js";

export async function adicionarFavorito(favorito) {
    if (!favorito.id_usuario || !favorito.id_brinquedo) {
        throw new Error("Usuário e brinquedo precisam ser informados");
    }

    const [usuario] = await con.query(
        "SELECT id FROM usuario WHERE id = ?",
        [favorito.id_usuario]
    );

    if (usuario.length === 0) {
        throw new Error("Usuário não encontrado");
    }

    const [brinquedo] = await con.query(
        "SELECT id, status FROM brinquedo WHERE id = ?",
        [favorito.id_brinquedo]
    );

    if (brinquedo.length === 0) {
        throw new Error("Brinquedo não encontrado");
    }

    if (brinquedo[0].status !== "disponivel") {
        throw new Error("Esse brinquedo não está disponível");
    }

    const id = await repository.saveFavorito(favorito);

    await con.query(
        "UPDATE brinquedo SET status = 'indisponivel' WHERE id = ?",
        [favorito.id_brinquedo]
    );

    return id;
}

export async function listarFavoritos(id_usuario) {
    return await repository.listFavoritos(id_usuario);
}

export async function excluirFavorito(id) {
    return await repository.deleteFavorito(id);
}


export async function atualizarStatusFavorito(id, status) {
    if (!["recebido", "nao_recebido"].includes(status)) {
        throw new Error("Status inválido");
    }

    return await repository.updateStatusFavorito(id, status);
}