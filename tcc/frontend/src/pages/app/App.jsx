
import Cabe from "../../components/cabeçalho/index.jsx";
import { useState, useEffect, useRef } from "react";
import Rodapé from "../../components/rodapé/index.jsx";
import api from "../../service/api.js";
import "./App.scss";

function App() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const [Nome, setNome] = useState(usuario?.nome || "");
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

  const inputFoto = useRef(null);

  // SELECIONAR FOTO
  function selecionarFoto(e) {
    const arquivo = e.target.files?.[0];

    console.log("ARQUIVO SELECIONADO:", arquivo);

    if (!arquivo) {
      setFoto(null);
      return;
    }

    if (!arquivo.type.startsWith("image/")) {
      alert("Selecione somente arquivos de imagem.");
      e.target.value = "";
      setFoto(null);
      return;
    }

    setFoto(arquivo);
  }

  // CADASTRAR BRINQUEDO
  async function envio() {
    try {
      if (!usuario?.id) {
        alert("Faça login para cadastrar uma doação.");
        return;
      }

      if (!nomeBrinquedo.trim() || !descricao.trim()) {
        alert("Preencha o nome e a descrição.");
        return;
      }

      const arquivo = inputFoto.current?.files?.[0];

      if (!arquivo) {
        alert("Selecione uma foto para o brinquedo.");
        return;
      }

      const dados = new FormData();

      dados.append("nome", nomeBrinquedo);
      dados.append("descricao", descricao);
      dados.append("foto", arquivo);
      dados.append("id_doador", usuario.id);

      console.log("ARQUIVO ENVIADO:", arquivo.name);
      console.log("TIPO:", arquivo.type);
      console.log("FORM DATA:", [...dados.entries()]);

      const resposta = await api.post("/brinquedos", dados);

      console.log("RESPOSTA DO CADASTRO:", resposta.data);

      alert("Doação cadastrada, muito obrigado pela sua ajuda!!!!");

      setNomeBrinquedo("");
      setDescricao("");
      setFoto(null);

      if (inputFoto.current) {
        inputFoto.current.value = "";
      }

      setdoaçao(false);

      const lista = await api.get("/brinquedos/disponiveis");
      setbrinq(lista.data);

    } catch (error) {
      console.log("Erro ao cadastrar doação:", error);
      console.log("Resposta do servidor:", error.response?.data);

      alert(
        error.response?.data?.erro ||
        "Não foi possível cadastrar a doação."
      );
    }
  }

  // LISTAR BRINQUEDOS
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

  // ESCOLHER BRINQUEDO
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

  // BUSCAR BRINQUEDO
  async function buscarBrinquedo(id) {
    try {
      const resposta = await api.get(`/brinquedos/${id}`);
      setbrinqselecionado(resposta.data);
    } catch (error) {
      console.log("Erro ao buscar brinquedo:", error);
    }
  }

  // CAMINHO DA FOTO
  function caminhoFoto(caminho) {
    if (!caminho) {
      return "/assets/image/image 81.png";
    }

    if (caminho.startsWith("http")) {
      return caminho;
    }

    return `${api.defaults.baseURL}/${caminho.replace(/^\/+/, "")}`;
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

          <a
            className="Co_Butão"
            onClick={() => setdoaçao(true)}
          >
            <img
              className="coracao"
              src="../../../assets/icons/image 61.png"
              height={29}
              alt=""
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
              alt=""
            />
          </div>

          <div className="sol1">
            <img src="../../assets/image/image 18.png" height={350} alt="" />
          </div>

          <div className="nuvem2">
            <img
              src="../../assets/image/images-removebg-preview 1.png"
              height={250}
              alt=""
            />
          </div>
        </div>
      </section>

      {/* BRINQUEDOS DISPONÍVEIS */}
      <section className="final">
        <div className="lista-brinquedos">
          {brinq.map(item => (
            <div className="brinquedo" key={item.id}>
              <img
                src={caminhoFoto(item.foto_url)}
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

      {/* MODAL DE DOAÇÃO */}
      {doaçao && (
        <div
          className="fundo-borrado"
          onClick={() => setdoaçao(false)}
        >
          <div
            className="caixa-doaçao"
            onClick={e => e.stopPropagation()}
          >
            <label className="selecionar-foto">
              {foto ? (
                <img
                  src={URL.createObjectURL(foto)}
                  alt="Foto do brinquedo"
                />
              ) : (
                <img
                  src="/assets/image/image 81.png"
                  alt="Selecionar foto"
                />
              )}

              <input
                ref={inputFoto}
                type="file"
                accept="image/*"
                onChange={selecionarFoto}
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

      {/* MODAL DE ESCOLHA */}
      {queromais && briqselecionado && (
        <div
          className="fundo-q"
          onClick={() => setqueromais(false)}
        >
          <div
            className="caixa-seila"
            onClick={e => e.stopPropagation()}
          >
            <div className="info-brinquedo">
              <img
                src={caminhoFoto(briqselecionado.foto_url)}
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

            <button onClick={testen}>
              Esse mesmo??
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
