import './index.scss';
import Logo from '../../components/logo/index.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from "../../service/api.js";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [msg, setMsg] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastro(event) {
        event.preventDefault();
        setErro("");
        setMsg("");

        if (!nome.trim() || !email.trim() || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        setCarregando(true);
        try {
            await api.post("/usuarios", {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha
            });

            setMsg("Cadastro realizado com sucesso!");
            setNome("");
            setEmail("");
            setSenha("");
        } catch (error) {
            setErro(error.response?.data?.erro || "Não foi possível realizar o cadastro.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className='container-cadastro'>
            <div className="lado_esquerdo">
                <Logo />
                <div className='container-txt'>
                    <h1>crie sua conta</h1>
                    <h2 className='cor2'>faça parte dessa corrente de solidariedade</h2>
                </div>
                <form onSubmit={cadastro}>
                    <div className='container-input'>
                        <div className='input-nome-cadastro'>
                            <img src='/assets/icons/icone-de-nome.png' alt="" />
                            <input type="text" placeholder='digite seu nome' className='in-nome-cadastro' value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div className='input-email-cadastro'>
                            <img src="/assets/icons/image 92.png" alt="" />
                            <input type="email" placeholder='digite seu email' className='in-email-cadastro' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='input-senha-cadastro'>
                            <img src="/assets/icons/image 93.png" alt="" />
                            <input type="password" placeholder='digite sua senha' className='in-senha-cadastro' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className='but-cadastro' disabled={carregando}>
                        {carregando ? "Cadastrando..." : "cadastrar-se"}
                    </button>
                </form>
                {erro && <p className="mensagem-erro">{erro}</p>}
                {msg && <p className="mensagem-sucesso">{msg}</p>}
                <p className="texto-cadastro">Já tem uma conta? <Link to="/">Entre</Link></p>
            </div>
            <div className="lado_direito"></div>
        </div>
    );
}
