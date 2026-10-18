import'./index.scss'

export default function Cabeçario(){
return(
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
 <div className='CDoaçao'>
<a > 
  <img src='../../../assets/icons/coraçao.png' height={19} /> 
  Doe agora
</a>
</div>   
</div>
</div>

)

}