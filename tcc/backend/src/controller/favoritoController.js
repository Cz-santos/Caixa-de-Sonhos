

import * as service from "../services/favoritoService.js";

export async function adicionar(req, res) {
    try {
        const favorito = req.body;
        const id = await service.adicionarFavorito(favorito);

        res.status(201).send({
            mensagem: "Brinquedo adicionado aos favoritos!",
            id
        });

    } catch (err) {
        const status = err.message.includes("já está nos favoritos")
            ? 409
            : err.message.includes("não encontrado") ||
              err.message.includes("precisam ser informados")
                ? 400
                : 500;

        res.status(status).send({ erro: err.message });
    }
}

export async function listar(req, res) {
    try {
        const id_usuario = req.params.id_usuario;
        const favoritos = await service.listarFavoritos(id_usuario);

        res.status(200).send(favoritos);

    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function excluir(req, res) {
    try {
        const id = req.params.id;
        const resultado = await service.excluirFavorito(id);

        if (!resultado) {
            return res.status(404).send({
                erro: "Favorito não encontrado"
            });
        }

        res.status(200).send({
            mensagem: "Favorito removido com sucesso"
        });

    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}

export async function atualizarStatus(req, res) {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const resultado = await service.atualizarStatusFavorito(id, status);

        if (!resultado) {
            return res.status(404).send({
                erro: "Favorito não encontrado"
            });
        }

        res.status(200).send({
            mensagem: "Status atualizado com sucesso!"
        });

    } catch (err) {
        const codigo = err.message === "Status inválido" ? 400 : 500;

        res.status(codigo).send({
            erro: err.message
        });
    }
}