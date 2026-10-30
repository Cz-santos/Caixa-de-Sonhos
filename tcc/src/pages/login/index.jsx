import"./index.scss"

export default function Login(){
    return(
        <section className="login-começo">
             <div className="lado-esquerdo-login">

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
            <a className="but-login"> Entra</a>
            <p class="texto-cadastro">Não tem uma conta? <a href="#">Cadastre-se</a></p>
            </div>

            <div className="lado-direito-login">
                <img src="../../assets/image/image 98.png" height={1000}/>
            </div>

        </section>
    )

}

