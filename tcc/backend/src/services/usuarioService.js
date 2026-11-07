
import * as repository from "../repository/usuarioRepository.js";
import bcrypt from "bcryptjs";

export async function cadastrarUsuario(usuario) {
    const usuarioExistente = await repository.getUsuarioByEmail(usuario.email);

    if (usuarioExistente) {
        throw new Error("Este email já está cadastrado");
    }

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

    const novoUsuario = {
        ...usuario,
        senha: senhaCriptografada
    };

    return await repository.saveUsuario(novoUsuario);
}

export async function fazerLogin(dados) {
    const usuario = await repository.getUsuarioByEmail(dados.email);

    if (!usuario) {
        throw new Error("Email ou senha incorretos");
    }

    const senhaCorreta = await bcrypt.compare(dados.senha, usuario.senha);

    if (!senhaCorreta) {
        throw new Error("Email ou senha incorretos");
    }

    const { senha, ...usuarioSemSenha } = usuario;

    return usuarioSemSenha;
}

export async function buscarUsuario(id) {
    return await repository.getUsuario(id);
}

export async function listarUsuarios() {
    return await repository.listUsuarios();
}

export async function atualizarUsuario(id, usuario) {
    if (!usuario.nome && !Object.prototype.hasOwnProperty.call(usuario, "foto")) {
        throw new Error("Informe o nome ou a foto para atualizar");
    }

    return await repository.updateUsuario(id, usuario);
}

export async function excluirUsuario(id) {
    return await repository.deleteUsuario(id);
}
