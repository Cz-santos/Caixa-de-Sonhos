
import * as service from "../services/favoritoService.js";

export async function adicionar(req, res) {
    try {
        const favorito = req.body;
        const id = await service.adicionarFavorito(favorito);

        res.status(201).send({ id });
    } catch (err) {
        res.status(500).send({ erro: err.message });
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
        await service.excluirFavorito(id);

        res.status(200).send({ mensagem: "Favorito removido com sucesso" });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
}
