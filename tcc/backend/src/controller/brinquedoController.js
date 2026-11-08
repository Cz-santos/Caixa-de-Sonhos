
import * as service from "../services/brinquedoService.js";
export async function cadastrar(req, res) {
    try {
        const brinquedo = {
            ...req.body,
            foto_url: req.file ? `/uploads/${req.file.filename}` : null
        };

        console.log("DADOS DO BRINQUEDO:", brinquedo);

        const id = await service.cadastrarBrinquedo(brinquedo);

        console.log("BRINQUEDO CADASTRADO:", id);

        res.status(201).send({ id });

    } catch (err) {
        console.log("ERRO AO CADASTRAR BRINQUEDO:", err);

        res.status(500).send({ erro: err.message });
    }
}

export async function listar(req, res) {
    try {
        const brinquedos = await service.listarBrinquedos();
        res.status(200).send(brinquedos);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function listarDisponiveis(req, res) {
    try {
        const brinquedos = await service.listarBrinquedosDisponiveis();
        res.status(200).send(brinquedos);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function buscar(req, res) {
    try {
        const id = req.params.id;
        const brinquedo = await service.buscarBrinquedo(id);

        if (!brinquedo) {
            return res.status(404).send({ erro: "Brinquedo não encontrado" });
        }

        res.status(200).send(brinquedo);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function atualizar(req, res) {
    try {
        const id = req.params.id;
        const brinquedo = req.body;

        await service.atualizarBrinquedo(id, brinquedo);

        res.status(200).send({ mensagem: "Brinquedo atualizado com sucesso" });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function excluir(req, res) {
    try {
        const id = req.params.id;
        await service.excluirBrinquedo(id);

        res.status(200).send({ mensagem: "Brinquedo excluído com sucesso" });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}
