import"./index.scss"
import {Link} from "react-router-dom"
import Logo from "../../components/logo/index.jsx"

export default function Login(){
    return(
        <section className="login-começo">
             <div className="lado-esquerdo-login">
        <Logo/>
            <div className="texto-login"> 
            <h2>Bem vindo de volta!!</h2>
            <p>Juntos podemos continuar levando alegria para eles!</p>
            </div> 

            <div className="input-email">
            <img src="../../assets/icons/image 92.png"/>
            <input type="email" placeholder="Email" className="in-email" />
            </div>


            <div className="input-senha">
            <img src="../../assets/icons/image 93.png"/>
            <input type="password" placeholder="Senha" className="in-senha" />
            </div>
            <Link to="/home" className="but-login"> Entra</Link>
            <p class="texto-cadastro">Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
            </div>

            <div className="lado-direito-login">
                <img src="../../assets/image/sela.png" />
            </div>

        </section>
    )

}

