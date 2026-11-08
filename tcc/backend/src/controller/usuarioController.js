
import * as service from "../services/usuarioService.js";


export async function cadastrar(req, resp) {
    try {
        const usuario = req.body;

        console.log("DADOS RECEBIDOS:", usuario);

        const id = await service.cadastrarUsuario(usuario);

        console.log("ID CADASTRADO:", id);

        resp.status(201).send({ id });
    } catch (err) {
        console.log("ERRO NO CADASTRO:", err);

        resp.status(400).send({ erro: err.message });
    }
}


export async function login(req, resp) {
    try {
        const dados = req.body;
        const usuario = await service.fazerLogin(dados);

        resp.status(200).send(usuario);
    } catch (err) {
        resp.status(401).send({ erro: err.message });
    }
}

export async function buscar(req, resp) {
    try {
        const id = req.params.id;
        const usuario = await service.buscarUsuario(id);

        if (!usuario) {
            return resp.status(404).send({ erro: "Usuário não encontrado" });
        }

        resp.status(200).send(usuario);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
}

export async function listar(req, resp) {
    try {
        const usuarios = await service.listarUsuarios();

        resp.status(200).send(usuarios);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
}

export async function atualizar(req, resp) {
    try {
        const id = req.params.id;

        const usuario = {};

        if (req.body.nome !== undefined) {
            usuario.nome = req.body.nome;
        }

        if (req.file) {
            usuario.foto = `/uploads/${req.file.filename}`;
        }

        if (req.body.removerFoto === "true") {
            usuario.foto = null;
        }

        const resultado = await service.atualizarUsuario(id, usuario);

        if (!resultado) {
            return resp.status(404).send({ erro: "Usuário não encontrado" });
        }

        resp.status(200).send({
            mensagem: "Perfil atualizado com sucesso",
            foto: usuario.foto
        });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
}

export async function excluir(req, resp) {
    try {
        const id = req.params.id;
        const resultado = await service.excluirUsuario(id);

        resp.status(200).send({ resultado });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
}
