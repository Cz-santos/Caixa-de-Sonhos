import"./index.scss"
import api from "../../service/api.js"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/index.jsx"

export default function Login(){
    const navegar = useNavigate();
    const[email, setemail] = useState("")
    const[senha, setsenha] = useState("")
    const[erro, seterro] = useState("")

   async function loginsave(e) {
    e.preventDefault();
    seterro("");

    try {
        const resposta = await api.post("/login", {
            email: email,
            senha: senha
        });

        console.log("Login:", resposta.data);

        localStorage.setItem("usuario", JSON.stringify(resposta.data));

        navegar("/home");

    } catch (error) {
        seterro(
            error.response?.data?.erro || "Não foi possível fazer login"
        );
    }
}
    return(
        <section className="login-começo">
             <div className="lado-esquerdo-login">
        <Logo/>
            <div className="texto-login"> 
            <h2>Bem vindo de volta!!</h2>
            <p>Juntos podemos continuar levando alegria para eles!</p>
            </div> 

            <form onSubmit={loginsave}>
            <div className="input-email">
            <img src="../../assets/icons/image 92.png"/>
            <input type="email" placeholder="Email" className="in-email"  value={email} onChange={(a)=>setemail(a.target.value)}/>
            </div>
            <div className="input-senha">
            <img src="../../assets/icons/image 93.png"/>
            <input type="password" placeholder="Senha" className="in-senha" value={senha} onChange={(b)=>setsenha(b.target.value)} />
            </div>
            <button type="submit" className="but-login">Entrar</button>
            </form>
            {erro && <p className="mensagem-erro">{erro}</p>}
            <p className="texto-cadastro">Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
            </div>

            <div className="lado-direito-login">
                <img src="../../assets/image/sela.png" />
            </div>

        </section>

        
    )

}

