
import * as repository from "../repository/brinquedoRepository.js";
import * as doacaoRepository from "../repository/doacaoRepository.js";

export async function cadastrarBrinquedo(brinquedo) {
    if (!brinquedo.id_doador) {
        throw new Error("O doador precisa ser informado");
    }

    const id = await repository.saveBrinquedo(brinquedo);

    await doacaoRepository.saveDoacao({
        id_doador: brinquedo.id_doador,
        id_brinquedo: id,
        id_beneficiario: null
    });

    return id;
}

export async function listarBrinquedos() {
    return await repository.listBrinquedos();
}

export async function listarBrinquedosDisponiveis() {
    return await repository.listBrinquedosDisponiveis();
}

export async function buscarBrinquedo(id) {
    return await repository.getBrinquedo(id);
}

export async function atualizarBrinquedo(id, brinquedo) {
    return await repository.updateBrinquedo(id, brinquedo);
}

export async function excluirBrinquedo(id) {
    return await repository.deleteBrinquedo(id);
}
