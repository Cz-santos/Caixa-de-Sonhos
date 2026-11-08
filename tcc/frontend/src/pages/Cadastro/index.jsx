import './index.scss'
import Logo from '../../components/logo/index.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import api from "../../service/api.js"
export default function Cadastro() {
    const [nome, setnome] = useState("")
    const [email, setemail] = useState("")
    const [senha, setsenha] = useState("")
    const [erro, seterro] = useState("")
    const [msg, setmsg] = useState("")

    async function cadastro(event) {
        event.preventDefault();

        seterro("")
        setmsg("")

        try {
            const resposta = await api.post("/usuarios", {
                nome: nome,
                email: email,
                senha: senha
            });

            setmsg("Cadastro realizado com sucesso!!!!");
            setnome("");
            setemail("");
            setsenha("");
        }

        catch(error){
            console.log(error);

            seterro(
                error.response?.data?.erro ||"Nao foi possivel realizar o cadastro" 
            )
        }
        }

    return (
        <>
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
                            <img src='/assets/icons/icone-de-nome.png' />
                            <input type="text" placeholder='digite seu nome' className='in-nome-cadastro' value={nome} onChange={(e) => setnome(e.target.value)} />
                        </div>

                        <div className='input-email-cadastro'>
                            <img src="/assets/icons/image 92.png" />
                            <input type="email" placeholder='digite seu email' className='in-email-cadastro' value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>

                        <div className='input-senha-cadastro'>
                            <img src="/assets/icons/image 93.png" />
                            <input type="password" placeholder='digite sua senha' className='in-senha-cadastro' value={senha} onChange={(e) => setsenha(e.target.value)} />
                        </div>

                    </div>
                     <button type="submit" className='but-cadastro'>cadastra-se</button>
                    </form>
                    {erro && <p className="mensagem-erro">{erro}</p>}
                    {msg && <p className="mensagem-sucesso">{msg}</p>}
                    <p class="texto-cadastro">Ja tem uma conta? <Link to="/">Entre</Link></p>
                </div>

                <div className='lado_direito'> </div>

            </div>











        </>






    )





}