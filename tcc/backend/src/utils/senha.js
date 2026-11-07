import bcrypt from "bcryptjs";

export async function criptografarSenha(senha) {
    return await bcrypt.hash(senha, 10);
}

export async function compararSenha(senha, senhaHash) {
    return await bcrypt.compare(senha, senhaHash);
}