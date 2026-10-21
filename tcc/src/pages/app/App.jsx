import Cabe from '../../components/cabeçalho/index.jsx'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Cabe/>

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
        <div className='Me_Começo'>
          <h1 className='Me_titulo'> Como Funciona</h1>
        <div className='me_imagens'>
            <div className='me_imagem1'>  
            <img className='img1' src='../../assets/image/image 62.png ' height={190}></img>
            <h1 className='me_tituloimg'> Separe os brinquedos  </h1>
            </div>
        </div>

        </div>

      </section>

    </div>
  );
}

export default App;
