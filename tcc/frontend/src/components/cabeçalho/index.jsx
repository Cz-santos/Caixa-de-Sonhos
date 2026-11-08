
import './index.scss'
import { Link } from 'react-router-dom'
import Logo from "../logo/index.jsx"

export default function Cabecalho() {
  return (
    <div className='Cabe'>
    <Logo className="test" />
      <div className='Cbotoes'>
        <Link to="/home" className='inicio'>Inicio</Link>
        <Link to="/" className="login">Login</Link>
        <Link to="/cadastro" className='cadastro'>Cadastro</Link>
        < Link to="/Usuario" className='perfi'>Perfil</Link>

        <a className='CDoaçao'>
          <img className='coracao' src='../../../assets/icons/image 61.png' height={19} />
          Doe agora
        </a>
      </div>
    </div>
  )
}
