
import './index.scss'
import { Link } from 'react-router-dom'
import Logo from "../logo/index.jsx"
import { useState } from 'react';
import api from "../../service/api.js"

export default function Cabecalho() {
 
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    const [doaçao, setdoaçao] = useState(false);
    const [nomeBrinquedo, setNomeBrinquedo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState(null);
      async function envio() {
    try {
      const dados = new FormData();

      dados.append("nome", nomeBrinquedo);
      dados.append("descricao", descricao);
      dados.append("foto", foto);
      dados.append("id_doador", usuario.id);

      const resposta = await api.post("/brinquedos", dados);

      alert("Doaçao cadastrada, muito obrigado pela sua ajuda!!!!");

      setNomeBrinquedo("");
      setDescricao("");
      setFoto(null);
      setdoaçao(false);
    } catch (error) {
      console.log("Erro ao cadastrar doação:", error);
      alert("Não foi possível cadastrar a doação.");
    }

  }

   return (
    
      <div className='Cabe'>
        <Logo className="test" />
        <div className='Cbotoes'>
          <Link to="/home" className='inicio'>Inicio</Link>
          <Link to="/" className="login">Login</Link>
          <Link to="/cadastro" className='cadastro'>Cadastro</Link>
          <div className='CDoaçao' >
            <img src='/assets/icons/image 61.png' height={20}/>
          <Link to="/Usuario" className='perfi'>Perfil</Link>
          </div>
      </div>
    </div>
     
  );
}
