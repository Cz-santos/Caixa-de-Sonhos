
import * as service from "../services/doacaoService.js";

export async function cadastrar(req, res) {
    try {
        const doacao = req.body;
        const id = await service.cadastrarDoacao(doacao);

        res.status(201).send({ id });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function listar(req, res) {
    try {
        const doacoes = await service.listarDoacoes();
        res.status(200).send(doacoes);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function buscar(req, res) {
    try {
        const id = req.params.id;
        const doacao = await service.buscarDoacao(id);

        if (!doacao) {
            return res.status(404).send({ erro: "Doação não encontrada" });
        }

        res.status(200).send(doacao);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function atualizar(req, res) {
    try {
        const id = req.params.id;
        const doacao = req.body;

        await service.atualizarDoacao(id, doacao);

        res.status(200).send({ mensagem: "Doação atualizada com sucesso" });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function excluir(req, res) {
    try {
        const id = req.params.id;
        await service.excluirDoacao(id);

        res.status(200).send({ mensagem: "Doação excluída com sucesso" });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function listarPorDoador(req, res) {
    try {
        const id_doador = req.params.id_doador;

        const doacoes = await service.listarDoacoesPorDoador(id_doador);

        res.status(200).send(doacoes);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}