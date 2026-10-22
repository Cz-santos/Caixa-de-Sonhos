import Cabe from '../../components/cabeçalho/index.jsx'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Cabe />

      <section className='começo'>
        <img className='imagemco' src='../../../assets/image/D.png' alt="Doação" />
        <div className='começoblur'>
          <h1 className='co_titulo1'>Um Brinquedo</h1>
          <h2 className='co_titulo2'>Pode mudar uma vida</h2>
          <p className='Co_para'>Doe brinquedos e ajude a levar alegria,
            afeto e esperaça para muitas criaças.</p>
          <a className='Co_Butão'>
            <img className='coracao' src='../../../assets/icons/image 61.png' height={29} />
            Doe Agora
          </a>
        </div>
      </section>



      <section className='meio'>
        <h1 className='meio-titulo'> Como Funciona</h1>
        <div className='co-meio'>

          <div className='meio-img'>
            <div className='me-img'>
              <img src='../../assets/image/image 62.png ' alt='urso de pelucia' height={200} />
            </div>
            <div className='a'>
              <h2> Separe os Brinquedos</h2>
            </div>
            <p className='desc'> Escolha brinquedos em <br/>bons estados e limpos </p>
          </div>
        
          <div className='meio-img'>
            <div className='me-img'>
              <img src='../../assets/image/image 63.png ' alt='localizaçao' height={200}/>
            </div>
            <div className='a'>
              <h2>Entrega ou Agende </h2>
            </div>
            <p className='desc'>Leve ate um dos pontos<br/> de coleta mais proximo </p>
          </div>
          <div className='meio-img'>
            <div className='me-img'>
              <img src='../../assets/image/image 64.png  ' alt='Criança feliz' height={200}/>
            </div>
            <div className='a'>
              <h2>Crinaças Felizes </h2>
            </div>
            <p className='desc'> Seu gesto chega até <br/> quem precisa </p>
          </div>

        </div>
      </section>

    <section className='meiocéu'>
    <div className='céu'>
    <div className='nuvem1'></div>
    <div className='sol1'></div>
    <div className='nuvem2'></div>

    </div>

    </section>
    </div>
  );
}

export default App;
