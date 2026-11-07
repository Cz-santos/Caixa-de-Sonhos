
import * as repository from "../repository/favoritoRepository.js";

export async function adicionarFavorito(favorito) {
    return await repository.saveFavorito(favorito);
}

export async function listarFavoritos(id_usuario) {
    return await repository.listFavoritos(id_usuario);
}

export async function excluirFavorito(id) {
    return await repository.deleteFavorito(id);
}
