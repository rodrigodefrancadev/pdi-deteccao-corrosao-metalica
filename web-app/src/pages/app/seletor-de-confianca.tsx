import { FC, useState, useEffect } from "react";
import detectorService from "../../services/detector";

const SeletorDeConfianca: FC = () => {
  const [confianca, setConfianca] = useState<number>(detectorService.confianca);

  useEffect(() => {
    detectorService.setConfianca(confianca);
  }, [confianca]);

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "400px",
        margin: 0,
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h5 className="small">Grau de Confiança</h5>
      <div
        className="field"
        style={{ width: "90%", maxWidth: "400px", margin: 0 }}
      >
        <label className="slider">
          <input
            type="range"
            value={(confianca * 100).toString()}
            onChange={(e) => setConfianca(Number(e.target.value) / 100)}
          />
          <span></span>
        </label>
        <span className="helper">{(confianca * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default SeletorDeConfianca;
