import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./styles.css";
import { participantes } from "../../data";
import useAppContext from "../../hooks/use-app-context";
import { Pagina } from "../../contexts/app/types";

const HomePage: FC = () => {
  const maisInformacoesDialog = useRef<MaisInformacoesDialogRef>(null);
  const { navegarPara } = useAppContext();
  function iniciarAplicacao() {
    navegarPara(Pagina.APP);
  }

  function navegarParaSessao1() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navegarParaSessao2() {
    const sessao2 = document.getElementById("sessao-2");
    if (sessao2) {
      const topPos = sessao2.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  }

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const offset = 100; // Define o offset desejado
      if (window.scrollY > offset) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="sessao-1">
        <img src="/img/ufma-logo.png" alt="UFMA Logo" width={120} />
        <div className="space"></div>
        <img
          className="ecp-logo"
          src="/img/ecp-ufma-logo.png"
          alt="Logo da Engenharia da Computação"
        />
        <div className="space"></div>
        <h3 className="">Detector de Corrosão Metálica</h3>
        <h6 className="small">
          Modelo de visão computacional treinado com a arquitetura YOLO versão
          11.
        </h6>
        <div className="large-space"></div>
        <div className="s">
          <BotaoIniciarAplicacao onClick={iniciarAplicacao} />
          <div className="space"></div>
          <BotaoInformacoes
            onClick={() => maisInformacoesDialog.current?.mostrar()}
          />
          <MaisInformacoesDialog ref={maisInformacoesDialog} />
        </div>
        <div className="m l">
          <div style={{ display: "flex", flexDirection: "row" }}></div>
          <BotaoIniciarAplicacao onClick={iniciarAplicacao} />
          <BotaoInformacoes onClick={navegarParaSessao2} />
        </div>
        <div className="large-space"></div>
        <ParticipantesSmall />
      </div>
      <div id="sessao-2" className="m l sessao-2 surface-container">
        <div className="sessao-2-content">
          <div className="large-space"></div>
          <MaisInformacoesContent />
        </div>
      </div>

      <div className="m l">
        {scrolled && (
          <button
            className="circle extra secondary extend botao-voltar-inicio"
            onClick={navegarParaSessao1}
          >
            <i>arrow_upward</i>
            <span>Início</span>
          </button>
        )}
      </div>
    </div>
  );
};

const BotaoIniciarAplicacao: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button className="extra" onClick={onClick}>
      <i>
        <img src="/img/ia-stars-icon.svg" />
      </i>
      Iniciar Aplicação
    </button>
  );
};

const BotaoInformacoes: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button className="border extra" onClick={onClick}>
      Mais Informações
    </button>
  );
};

const Participantes: FC = () => {
  return (
    <div className="participantes-container">
      <article className="large-width surface-container-low">
        <h5 className="">Desenvolvido por</h5>
        <div className="space"></div>
        <hr></hr>
        <div className="space-small"></div>
        {participantes.map((participante) => (
          <div key={participante.nome} className="row wave">
            <img className="round" src={participante.img} />
            <div className="max">
              <h6
                className="small"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {participante.nome}
              </h6>
              <div>{participante.email}</div>
              <div className="s">{participante.cargo}</div>
            </div>
            <label className="m l">{participante.cargo}</label>
          </div>
        ))}
      </article>
    </div>
  );
};

const ParticipantesSmall: FC = () => {
  return (
    <div>
      <h6>Desenvolvido por</h6>
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          gap: 16,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {participantes.map((participante) => (
          <div style={{ cursor: "pointer" }} key={participante.nome}>
            <img className="circle" src={participante.img} />
            <div className="tooltip max medium-space" style={{ maxWidth: 200 }}>
              <div>
                <div>
                  <b>{participante.nome}</b>
                </div>
                <div style={{ fontSize: 12 }}>{participante.cargo}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface MaisInformacoesDialogRef {
  mostrar: () => void;
}
const MaisInformacoesDialog = forwardRef<MaisInformacoesDialogRef>((_, ref) => {
  const [open, setOpen] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      mostrar: () => {
        setOpen(true);
      },
    }),
    [setOpen]
  );

  const activeClass = open ? "active" : "";

  return (
    <dialog className={`max no-padding ${activeClass}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <header className="fill">
          <nav>
            <h5 className="max horizontal-padding">Informações</h5>
            <button
              className="circle transparent"
              onClick={() => setOpen(false)}
            >
              <i>close</i>
            </button>
          </nav>
        </header>
        <div className="padding" style={{ flex: 1, overflowY: "scroll" }}>
          <MaisInformacoesContent />
        </div>
      </div>
    </dialog>
  );
});

const MaisInformacoesContent: FC = () => {
  function abrirRepositorioGithub() {
    const url =
      "https://github.com/rodrigodefrancadev/trabalho-processamento-de-imagens-deteccao-corrozao-metalica";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <h3 className="">Detector de Corrosão Metálica</h3>
      <p>
        Esta aplicação é o resultado de um projeto desenvolvido por alunos da{" "}
        <b>Universidade Federal do Maranhão (UFMA)</b> no curso de{" "}
        <b>Engenharia de Computação</b> como atividade avaliativa da disciplina
        de <b>Processamento Digital de Imagens</b> ministrada pelo professor{" "}
        <b>Haroldo Gomes</b>.
      </p>
      <p>
        O objetivo é detectar corrosão metálica utilizando técnicas de visão
        computacional e aprendizado de máquina. O modelo foi treinado com a
        arquitetura YOLO versão 11, proporcionando uma boa precisão e desempenho
        na identificação de áreas corroídas em imagens.
      </p>

      <p>O código fonte do projeto está disponibilizado no link abaixo.</p>

      <div className="space"></div>

      <button className="border secondary" onClick={abrirRepositorioGithub}>
        <i>
          <img src="/img/github-mark.png" />
        </i>
        Repositório do Projeto
      </button>

      <div className="large-space"></div>
      <Participantes />
      <div className="large-space"></div>
      <div className="large-space"></div>
    </>
  );
};

export default HomePage;
