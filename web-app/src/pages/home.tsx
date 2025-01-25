import { FC, forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./home.css";
import { participantes } from "../data";

const HomePage: FC = () => {
  const maisInformacoesDialog = useRef<MaisInformacoesDialogRef>(null);

  return (
    <div>
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
        Modelo de visão computacional treinado com a arquitetura YOLO versão 11.
      </h6>
      <div className="large-space"></div>
      <div className="s">
        <BotaoIniciarAplicacao />
        <div className="space"></div>
        <BotaoInformacoes
          onClick={() => maisInformacoesDialog.current?.mostrar()}
        />
        <div className="large-space"></div>
        <ParticipantesSmall />
        <MaisInformacoesDialog ref={maisInformacoesDialog} />
      </div>
      <div className="m l">
        <div style={{ display: "flex", flexDirection: "row" }}></div>
        <BotaoIniciarAplicacao />
        <BotaoInformacoes />
        <Participantes />
      </div>
    </div>
  );
};

const BotaoIniciarAplicacao: FC = () => {
  return (
    <button className="extra">
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
      <article className="large-width">
        <h5 className="">Participantes</h5>
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
      <h6>Participantes</h6>
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
          <div style={{ cursor: "pointer" }}>
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

  function abrirRepositorioGithub() {
    const url =
      "https://github.com/rodrigodefrancadev/trabalho-processamento-de-imagens-deteccao-corrozao-metalica";
    window.open(url, "_blank", "noopener,noreferrer");
  }

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
          <h3 className="">Detector de Corrosão Metálica</h3>
          <p>
            Esta aplicação é o resultado de um projeto desenvolvido por alunos
            da <b>Universidade Federal do Maranhão (UFMA)</b> no curso de{" "}
            <b>Engenharia de Computação</b> como atividade avaliativa da
            disciplina de <b>Processamento Digital de Imagens</b> ministrada
            pelo professor <b>Haroldo Gomes</b>.
          </p>
          <p>
            O objetivo é detectar corrosão metálica utilizando técnicas de visão
            computacional e aprendizado de máquina. O modelo foi treinado com a
            arquitetura YOLO versão 11, proporcionando uma boa precisão e
            desempenho na identificação de áreas corroídas em imagens.
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
        </div>
      </div>
    </dialog>
  );
});

export default HomePage;
