import { useState } from "react";
import './index.scss';

export default function Perfil() {
    const [Foto, setFoto] = useState("");
    const [Nome, setNome] = useState(" Usuario");
    const [janela, setjanela] = useState(false); 


    const Imagem = (a) => {
        const arq = a.target.files[0];
        if (arq) {
            const leitor = new FileReader();
            leitor.onload = (b) => {
                setFoto(b.target.result);
            };
            leitor.readAsDataURL(arq);
        }
    };


    const Tx = (c) => {
        setNome(c.target.value);
    };

    return (
        <div className="tudo-perfil">
            <div className="começo-perfil">
                <div className="lado-foto">
                    <img src={Foto || "/assets/image/usuario.png"} alt="perfil" />
                </div>
                
                <div className="lado-texto">
                    <h1>Ola, <span className="cor2">{Nome.toUpperCase()}</span></h1>
                    <button className="editar-perfil" onClick={() => setjanela(true)}> ✏️</button>
                </div>

                <div className="caixa-coraçao">
                    <img src="/assets/image/image 24.png" alt="image"/>
                </div>
            </div>

            {janela && (
                <div className="fundo-borrado" onClick={() => setjanela(false)}>

                    <div className="caixa-edicao" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Perfil</h2>
                        
                        <label>Mudar foto de perfil:</label>
                        <input type='file' accept='image/*' onChange={Imagem} />
                        
                        <label>Mudar nome de usuário:</label>
                        <input type="text" value={Nome} className="input-text" onChange={Tx} />
                        
                        <div className="modal-botoes">
                            <button className="btn-salvar" onClick={() => setjanela(false)}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
