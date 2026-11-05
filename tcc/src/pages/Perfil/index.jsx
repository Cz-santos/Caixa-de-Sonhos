import{useState}from"react"
import './index.scss';


export default function Perfil(){
  const[Foto, setFoto] = useState("")
  const[Nome, setNome] = useState(" Usuario")

  const Imagem = (a) =>{
    const arq = a.target.files[0];
    if(arq){
        const leitor= new FileReader();

        leitor.onload = (b)=>{
            setFoto(b.target.result)
        };

        leitor.readAsDataURL(arq)

    }

    const Tx = (c) =>{
        setNome(c.target.value)

    }
  }



    return(
        <div className="Perfil-tudo">
        <div className='começo-perfil'>
            <input type='file' accept='image/*' onChange={Imagem}/>
            <img src={Foto|| "/assets/image/usuario.png"} alt='image'/>
            <h1 className="texth1"> seu nome é <span className="cor2">{Nome}</span></h1>
            <input type="text" value={Nome} onChange={(e)=> setNome(e.target.value)}/>
        </div>

        </div>

    )


    
}
