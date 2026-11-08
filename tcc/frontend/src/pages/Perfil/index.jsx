import { useState } from "react";
import './index.scss';
import api from "../../service/api.js";
import Cabe from "../../components/cabeçalho/index.jsx"

export default function Perfil() {
    const [savefoto, setsavefoto] = useState(null)
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    const [Foto, setFoto] = useState(usuario?.foto || "");
    const [Email, setEmail] = useState(usuario?.email);
    const [Nome, setNome] = useState(usuario?.nome || "Usuario");
    const [janela, setjanela] = useState(false);


    const Tx = (c) => {
        setNome(c.target.value);
    };

    async function psave() {
        try {
            const dados = new FormData();

            if (savefoto) {
                dados.append("foto", savefoto);
            }

            dados.append("nome", Nome);

            const resposta = await api.put(`/usuarios/${usuario.id}`, dados);

            const ua = {
                ...usuario,
                nome: Nome,
                email: Email,
                foto: resposta.data.foto || usuario.foto
            };

            localStorage.setItem("usuario", JSON.stringify(ua));

            setFoto(ua.foto);
            setsavefoto(null);

            setjanela(false);
            alert("Perfil atualizado!!!");

        } catch (error) {
            console.log("Erro ao atualizar perfil", error);
            alert("Desculpe, não foi possível atualizar o perfil");
        }
    }
    return (
        <div className="tudo-perfil">
            <Cabe />
            <br>
            </br>
            <div className="começo-perfil">
                <div className="lado-foto">
                    <img src={Foto || "/assets/image/usuario.png"} alt="perfil" />
                </div>

                <div className="lado-texto">
                    <div className="nome-email">
                        <h1>Ola, <span className="cor2">{Nome.toUpperCase()}</span></h1>
                        <p className="nome-email-p">{Email}</p>
                    </div>
                    <button className="editar-perfil" onClick={() => setjanela(true)}> ✏️</button>
                </div>

                <div className="caixa-coraçao-t">
                    <img src="/assets/image/image 24.png" alt="image" className="caixa-coraçao" />
                </div>
            </div>

            {janela && (
                <div className="fundo-borrado" onClick={() => setjanela(false)}>

                    <div className="caixa-edicao" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Perfil</h2>

                        <label>Mudar foto de perfil:</label>
                        <input className="input-imagem" type='file' accept='image/*' onChange={(e) => setsavefoto(e.target.files[0])} />
                        {savefoto ? (
                            <img
                                src={URL.createObjectURL(savefoto)}
                                alt="Foto do perfil"
                            />
                        ) : Foto ? (
                            <img src={`http://localhost:5002${Foto}`} alt="Foto do perfil" />
                        ) : (
                            <img src="/assets/image/usuario.png" />
                        )}

                        <label>Mudar nome de usuário:</label>
                        <input type="text" value={Nome} className="input-text" onChange={Tx} />

                        <div className="modal-botoes">
                            <button className="btn-salvar" onClick={psave}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
