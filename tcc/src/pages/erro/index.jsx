import './index.scss'
import { Link } from 'react-router-dom'

export default function Erro(){
    return(
        <section className='Erro'>
            <img className='img404' src='../../assets/image/urso404.png' height={600}/>
            <h1 className='ops'> Ops</h1>
            <h1 className='Pgn_n'> Pagina não Encontrada</h1>
            <h2 className='para-erro'>Parece que não encontramos essa pagina</h2>
            <div className='volta-erro'>
                <img src='../../assets/icons/home.png' height={50}/>
            <Link to="/" className='voltar-erro-bot'> Voltar ao inivio</Link>
            </div>
        </section>

    )

}