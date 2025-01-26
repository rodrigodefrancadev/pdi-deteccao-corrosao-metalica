import { FC, useEffect, useState } from "react";

interface VerificadorDePermissaoDeCameraProps {
  onPermiteCamera: () => void;
}

const VerificadorDePermissaoDeCamera: FC<
  VerificadorDePermissaoDeCameraProps
> = ({ onPermiteCamera }) => {
  const [temPermissao, setTemPermissao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

  const requestCameraPermission = async () => {
    setCarregando(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setTemPermissao(true);
    } catch (err) {
      setErro(true);
      console.error("Error accessing camera:", err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (temPermissao) {
      setTimeout(() => {
        onPermiteCamera();
      }, 1000);
    }
  }, [temPermissao, onPermiteCamera]);

  return (
    <div className="verificador-permissao-container">
      <i className="extra" style={{ transform: "scale(3)" }}>
        videocam
      </i>
      <div className="large-space"></div>
      <h5>Acesso à Câmera</h5>
      <div className="space"></div>
      <p style={{ textAlign: "center" }}>
        Para utilizar a aplicação é necessário a permissao de acesso à câmera.
        Clique no botão abaixo para autorizar.
      </p>
      <div className="space"></div>
      {temPermissao && (
        <p className="primary-text" style={{ textAlign: "center" }}>
          Permissão Concedida!
        </p>
      )}

      {!temPermissao && (
        <button
          onClick={requestCameraPermission}
          disabled={carregando || !!erro}
        >
          {carregando && <progress className="circle small"></progress>}
          Autorizar Acesso à Câmera
        </button>
      )}

      {erro && (
        <p className="error-text" style={{ textAlign: "center" }}>
          Permissão Negada! Para autorizar o acesso á câmera acesse as
          configurações do seu navegador.
        </p>
      )}
    </div>
  );
};

export default VerificadorDePermissaoDeCamera;
