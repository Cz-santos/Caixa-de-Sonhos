import{useState}from"react"
import './index.scss';


export default function Perfil(){
  const[Foto, setFoto] = useState("")

  const Imagem = (a) =>{
    const arq = a.target.files[0];
    if(arq){
        const leitor= new FileReader();

        leitor.onload = (b)=>{
            setFoto(b.target.result)
        };

        leitor.readAsDataURL(arq)

    }
  }

    return(
        <div className="Perfil-tudo">
        <div className='começo-perfil'>
            <input type='file' accept='image/*' onChange={Imagem}/>
            <img src={Foto|| "/assets/image/usuario.png"} alt='image'/>
        </div>

        </div>

    )


    
}
