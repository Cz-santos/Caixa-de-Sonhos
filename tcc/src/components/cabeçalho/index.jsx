
import './index.scss'
import { Link } from 'react-router-dom'
import Logo from "../logo/index.jsx"

export default function Cabecalho() {
  return (
    <div className='Cabe'>
    <Logo className="test" />
      <div className='Cbotoes'>
        <a className='inicio'>Inicio</a>
        <Link to="/login" className="login">Login</Link>
        <a className='cadastro'>Cadastro</a>
        <a className='perfi'>Perfil</a>

        <a className='CDoaçao'>
          <img className='coracao' src='../../../assets/icons/image 61.png' height={19} />
          Doe agora
        </a>
      </div>
    </div>
  )
}
