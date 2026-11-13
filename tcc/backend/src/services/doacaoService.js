
import * as repository from "../repository/doacaoRepository.js";
import * as brinquedoRepository from "../repository/brinquedoRepository.js";

export async function cadastrarDoacao(doacao) {
    return await repository.saveDoacao(doacao);
}

export async function listarDoacoes() {
    return await repository.listDoacoes();
}

export async function buscarDoacao(id) {
    return await repository.getDoacao(id);
}

export async function atualizarDoacao(id, doacao) {
    const doacaoExistente = await repository.getDoacao(id);

    if (!doacaoExistente) {
        throw new Error("Doação não encontrada");
    }

    if (doacaoExistente.id_beneficiario) {
        throw new Error("Esta doação já foi recebida");
    }

    const idBeneficiario = doacao.id_beneficiario;

    if (!idBeneficiario) {
        throw new Error("Beneficiário não informado");
    }

    const ultimaDoacao = await repository.getUltimaDoacaoBeneficiario(
        idBeneficiario
    );

    if (ultimaDoacao) {
        const dataLiberacao = new Date(ultimaDoacao.data_retirada);
        dataLiberacao.setMonth(dataLiberacao.getMonth() + 1);

        if (new Date() < dataLiberacao) {
            throw new Error(
                "Você precisa esperar completar um mês desde sua última retirada para receber outro brinquedo."
            );
        }
    }

    const brinquedo = await brinquedoRepository.getBrinquedo(
        doacaoExistente.id_brinquedo
    );

    if (!brinquedo || brinquedo.status !== "disponivel") {
        throw new Error("Este brinquedo não está disponível");
    }

    const resultado = await repository.updateDoacao(id, {
        id_beneficiario: idBeneficiario,
        data_retirada: new Date()
    });

    await brinquedoRepository.updateBrinquedo(
        brinquedo.id,
        {
            ...brinquedo,
            status: "indisponivel"
        }
    );

    return resultado;
}

export async function excluirDoacao(id) {
    return await repository.deleteDoacao(id);
}

export async function listarDoacoesPorDoador(id_doador) {
    return await repository.listDoacoesPorDoador(id_doador);
}