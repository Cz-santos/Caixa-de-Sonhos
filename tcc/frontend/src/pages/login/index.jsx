import "./index.scss";
import api from "../../service/api.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/index.jsx";

export default function Login() {
    const navegar = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function loginsave(e) {
        e.preventDefault();
        setErro("");

        if (!email.trim() || !senha) {
            setErro("Preencha seu email e sua senha.");
            return;
        }

        setCarregando(true);
        try {
            const resposta = await api.post("/login", {
                email: email.trim().toLowerCase(),
                senha
            });

            localStorage.setItem("usuario", JSON.stringify(resposta.data));
            navegar("/home");
        } catch (error) {
            if (error.code === "ECONNABORTED" || !error.response) {
                setErro("Não foi possível conectar à API. Verifique se o backend está iniciado.");
            } else {
                setErro(error.response.data?.erro || "Email ou senha incorretos.");
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <section className="login-começo">
            <div className="lado-esquerdo-login">
                <Logo />
                <div className="texto-login">
                    <h2>Bem vindo de volta!!</h2>
                    <p>Juntos podemos continuar levando alegria para eles!</p>
                </div>

                <form onSubmit={loginsave}>
                    <div className="input-email">
                        <img src="/assets/icons/image 92.png" alt="" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="in-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="input-senha">
                        <img src="/assets/icons/image 93.png" alt="" />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="in-senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button type="submit" className="but-login" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                {erro && <p className="mensagem-erro">{erro}</p>}
                <p className="texto-cadastro">
                    Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
            </div>

            <div className="lado-direito-login">
                <img src="/assets/image/sela.png" alt="" />
            </div>
        </section>
    );
}
