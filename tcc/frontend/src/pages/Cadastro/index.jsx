import './index.scss'


export default function Cadastro() {
    return (
        <>

            <div className='container-cadastro'>
                <div className='container-txt'>
                    <h1>crie sua conta</h1>
                    <h2>faça parte dessa corrente de solidariedade</h2>
                </div>

                <div className='container-input'>

                    <div>
                        <h2>Nome completo</h2>
                        <input type="text" placeholder='digite seu nome' />
                    </div>

                    <div>
                        <h2>Email</h2>
                        <input type="email" placeholder='digite seu email' />
                    </div>

                    <div>
                        <h2>Senha</h2>
                        <input type="password" placeholder='digite sua senha' />
                    </div>

                </div>

                <button>cadastra-se</button>

            </div>











        </>






    )





}