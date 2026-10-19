import './index.scss'

export default function Cabecalho(){
  return (
    <div className='Cabe'>
      <div className='Ctitulo'>
        {/* A logo do site */}
        <h1>Nome do Site</h1>
      </div>
      
      <div className='Cbotoes'>   
        <a>Inicio</a>
        <a>Login</a>
        <a>Cadastro</a>
        <a>Perfil</a>
        
        <a className='CDoaçao'> 
          <img className='coracao' src='../../../assets/icons/image 61.png' height={19} />  
          Doe agora
        </a>
      </div>
    </div>
  )
}
