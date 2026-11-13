
import Cabe from "../../components/cabeçalho/index.jsx";
import { useState, useEffect } from "react";
import Rodapé from "../../components/rodapé/index.jsx";
import api from "../../service/api.js";
import "./App.scss";

function App() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const [Nome, setNome] = useState(usuario?.nome);
  const [brinq, setbrinq] = useState([]);
  const [doaçao, setdoaçao] = useState(false);
  const [nomeBrinquedo, setNomeBrinquedo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const [queromais, setqueromais] = useState(false);
  const [testesenha, settestesenha] = useState("");
  const [testeemail, settesteemail] = useState("");
  const [resp, setresp] = useState("");
  const [briqselecionado, setbrinqselecionado] = useState(null);
  const [testebrinq, settestebrinq] = useState([]);

  async function envio() {
    try {
      const dados = new FormData();

      dados.append("nome", nomeBrinquedo);
      dados.append("descricao", descricao);
      dados.append("foto", foto);
      dados.append("id_doador", usuario.id);

      const resposta = await api.post("/brinquedos", dados);

      alert("Doação cadastrada, muito obrigado pela sua ajuda!!!!");

      setNomeBrinquedo("");
      setDescricao("");
      setFoto(null);
      setdoaçao(false);
    } catch (error) {
      console.log("Erro ao cadastrar doação:", error);
      alert("Não foi possível cadastrar a doação.");
    }
  }

  useEffect(() => {
    async function carregarbrinq() {
      try {
        const resposta = await api.get("/brinquedos/disponiveis");
        setbrinq(resposta.data);
      } catch (error) {
        console.log("Erro ao buscar brinquedos:", error);
      }
    }

    carregarbrinq();

    window.addEventListener("focus", carregarbrinq);

    return () => {
      window.removeEventListener("focus", carregarbrinq);
    };
  }, []);

  async function testen() {
    try {
      const resposta = await api.post("/login", {
        email: testeemail,
        senha: testesenha
      });

      const usuarioValidado = resposta.data;

      const dados = {
        id_usuario: usuarioValidado.id,
        id_brinquedo: briqselecionado.id
      };

      await api.post("/favoritos", dados);

      setresp("Brinquedo escolhido com sucesso!");

      settesteemail("");
      settestesenha("");

      setbrinqselecionado(null);
      setqueromais(false);

      const respostaBrinquedos = await api.get("/brinquedos/disponiveis");
      setbrinq(respostaBrinquedos.data);

    } catch (error) {
      console.log("Erro ao escolher brinquedo:", error);

      if (error.response) {
        setresp(error.response.data.erro);
      } else {
        setresp("Não foi possível conectar ao servidor.");
      }
    }
  }

  async function buscarBrinquedo(id) {
    try {
      const resposta = await api.get(`/brinquedos/${id}`);
      setbrinqselecionado(resposta.data);
    } catch (error) {
      console.log("Erro ao buscar brinquedo:", error);
    }
  }

  return (
    <div className="Principal">
      <Cabe />

      <section className="começo">
        <img
          className="imagemco"
          src="../../../assets/image/D.png"
          alt="Doação"
        />

        <div className="começoblur">
          <h1 className="co_titulo1">Um Brinquedo</h1>
          <h2 className="co_titulo2">mudar uma vida</h2>

          <p className="Co_para">
            Doe brinquedos e ajude a levar alegria, afeto e esperança para muitas
            crianças.
          </p>

          <a className="Co_Butão" onClick={async () => await setdoaçao(true)}>
            <img
              className="coracao"
              src="../../../assets/icons/image 61.png"
              height={29}
            />
            Doe Agora
          </a>
        </div>
      </section>

      <section className="meio">
        <h1 className="meio-titulo">Como Funciona:</h1>

        <div className="co-meio">
          <div className="meio-img1">
            <div className="me-img">
              <img
                src="../../assets/image/image 62.png"
                alt="urso de pelucia"
                height={200}
              />
            </div>

            <div className="a">
              <h2 className="co1">
                <span className="cor1">1</span> Brinquedos
              </h2>
            </div>

            <p className="desc">
              Escolha brinquedos em <br />
              bons estados e limpos
            </p>
          </div>

          <div className="meio-img1">
            <div className="me-img">
              <img
                src="../../assets/image/image 63.png"
                alt="localização"
                height={200}
              />
            </div>

            <div className="a">
              <h2>
                <span className="cor2">2</span> Entregue
              </h2>
            </div>

            <p className="desc">
              Leve até um dos pontos
              <br /> de coleta mais próximo
            </p>
          </div>

          <div className="meio-img1">
            <div className="me-img">
              <img
                src="../../assets/image/image 64.png"
                alt="Criança feliz"
                height={200}
              />
            </div>

            <div className="a">
              <h2>
                <span className="cor3">3</span> Crianças Felizes
              </h2>
            </div>

            <p className="desc">
              Seu gesto chega até <br /> quem precisa
            </p>
          </div>
        </div>
      </section>

      <section className="meiocéu">
        <div className="céu">
          <div className="nuvem1">
            <img
              src="../../assets/image/images-removebg-preview 1.png"
              height={250}
            />
          </div>

          <div className="sol1">
            <img src="../../assets/image/image 18.png" height={350} />
          </div>

          <div className="nuvem2">
            <img
              src="../../assets/image/images-removebg-preview 1.png"
              height={250}
            />
          </div>
        </div>
      </section>

      <section className="final">
        <div className="lista-brinquedos">
          {brinq.map(item => (
            <div className="brinquedo" key={item.id}>
              <img
                src={`${api.defaults.baseURL}${item.foto_url}`}
                alt={item.nome}
                className="imagem-brinquedos"
              />

              <div className="bri-texto">
                <h2 className="nome-brinquedo">{item.nome}</h2>
                <p className="desc-brinq">{item.descricao}</p>

                <button
                  className="botao-produto"
                  onClick={async () => {
                    await buscarBrinquedo(item.id);
                    setqueromais(true);
                  }}
                >
                  Quero esse!
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Rodapé />

      {doaçao && (
        <div className="fundo-borrado" onClick={() => setdoaçao(false)}>
          <div className="caixa-doaçao" onClick={e => e.stopPropagation()}>
            <label className="selecionar-foto">
              {foto ? (
                <img src={URL.createObjectURL(foto)} alt="Foto do brinquedo" />
              ) : (
                <img src="/assets/image/image 81.png" />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={e => setFoto(e.target.files[0])}
              />
            </label>

            <input
              type="text"
              placeholder="Nome do Brinquedo:"
              value={nomeBrinquedo}
              onChange={e => setNomeBrinquedo(e.target.value)}
            />

            <textarea
              placeholder="Descrição:"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />

            <button type="button" onClick={envio}>
              Enviar
            </button>
          </div>
        </div>
      )}

      {queromais && briqselecionado && (
        <div className="fundo-q" onClick={() => setqueromais(false)}>
          <div
            className="caixa-seila"
            onClick={e => e.stopPropagation()}
          >
            <div className="info-brinquedo">
              <img
                src={`${api.defaults.baseURL}${briqselecionado.foto_url}`}
                alt={briqselecionado.nome}
              />

              <h2>{briqselecionado.nome}</h2>
              <p>{briqselecionado.descricao}</p>
            </div>

            <div className="texto-quero">
              <div className="input-nome">
                <input
                  type="email"
                  placeholder="Qual é o Email da conta:"
                  className="in-email"
                  value={testeemail}
                  onChange={e => settesteemail(e.target.value)}
                />
              </div>

              <div className="input-email">
                <input
                  type="password"
                  placeholder="Qual é a Senha da conta:"
                  className="in-senha"
                  value={testesenha}
                  onChange={e => settestesenha(e.target.value)}
                />
              </div>

              <p>{resp}</p>
            </div>

            <div className="quero-op">
              <select>
                <option>Escolha</option>
                <option>Frei</option>
                <option>Grajau ong</option>
              </select>
            </div>

            <button onClick={testen}>Esse mesmo??</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
