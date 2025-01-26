import { FC, useState } from "react";
import useAppContext from "../../hooks/use-app-context";
import { Pagina } from "../../contexts/app/types";
import VerificadorDePermissaoDeCamera from "./verificador-de-permissao-de-camera";
import "./style.css";
import Detector from "./detector";

const AppPage: FC = () => {
  const [pronto, setPronto] = useState(false);
  const { navegarPara } = useAppContext();

  function voltarParaHome() {
    navegarPara(Pagina.HOME);
  }

  return (
    <div className="app-page-container">
      <header>
        <nav>
          <button className="circle transparent" onClick={voltarParaHome}>
            <i>arrow_back</i>
          </button>
          <h6 className="max">Detector de Corrosão Metálica</h6>
        </nav>
      </header>
      {!pronto && (
        <VerificadorDePermissaoDeCamera
          onPermiteCamera={() => setPronto(true)}
        />
      )}

      {pronto && <Detector />}
    </div>
  );
};

export default AppPage;
