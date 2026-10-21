import './index.scss'

export default function Cabecalho(){
  return (
    <div className='Cabe'>
      <div className='Ctitulo'>
        {/* A logo do site */}
        <h1>Nome do Site</h1>
      </div>
      
      <div className='Cbotoes'>   
        <a className='inicio'>Inicio</a>
        <a className='login'>Login</a>
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
