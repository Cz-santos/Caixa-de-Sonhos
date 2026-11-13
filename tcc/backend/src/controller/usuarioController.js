import * as service from "../services/usuarioService.js";

export async function cadastrar(req, resp) {
    try {
        const { nome, email, senha } = req.body || {};
        if (!nome?.trim() || !email?.trim() || !senha) {
            return resp.status(400).send({ erro: "Preencha nome, email e senha" });
        }

        const id = await service.cadastrarUsuario({
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha
        });

        resp.status(201).send({ id });
    } catch (err) {
        console.error("ERRO NO CADASTRO:", err.message);
        resp.status(400).send({ erro: err.code === "ER_DUP_ENTRY" ? "Este email já está cadastrado" : err.message });
    }
}

export async function login(req, resp) {
    try {
        const { email, senha } = req.body || {};
        if (!email?.trim() || !senha) {
            return resp.status(400).send({ erro: "Informe email e senha" });
        }

        const usuario = await service.fazerLogin({
            email: email.trim().toLowerCase(),
            senha
        });

        resp.status(200).send(usuario);
    } catch (err) {
        console.error("ERRO NO LOGIN:", err.message);
        const erroBanco = err.code === "ECONNREFUSED" || err.code === "ER_ACCESS_DENIED_ERROR";
        resp.status(erroBanco ? 503 : 401).send({
            erro: erroBanco ? "Não foi possível conectar ao banco de dados" : err.message
        });
    }
}

export async function buscar(req, resp) {
    try {
        const usuario = await service.buscarUsuario(req.params.id);
        if (!usuario) return resp.status(404).send({ erro: "Usuário não encontrado" });
        resp.status(200).send(usuario);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
}

export async function listar(req, resp) {
    try {
        resp.status(200).send(await service.listarUsuarios());
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
}

export async function atualizar(req, resp) {
    try {
        const usuario = {};
        if (req.body.nome !== undefined) usuario.nome = req.body.nome;
        if (req.file) usuario.foto = `/uploads/${req.file.filename}`;
        if (req.body.removerFoto === "true") usuario.foto = null;

        const resultado = await service.atualizarUsuario(req.params.id, usuario);
        if (!resultado) return resp.status(404).send({ erro: "Usuário não encontrado" });

        resp.status(200).send({
            mensagem: "Perfil atualizado com sucesso",
            foto: Object.prototype.hasOwnProperty.call(usuario, "foto") ? usuario.foto : undefined
        });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
}

export async function excluir(req, resp) {
    try {
        const resultado = await service.excluirUsuario(req.params.id);
        if (!resultado) return resp.status(404).send({ erro: "Usuário não encontrado" });
        resp.status(200).send({ resultado });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
}
