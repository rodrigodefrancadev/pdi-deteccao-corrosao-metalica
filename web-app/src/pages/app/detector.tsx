import React, { useRef, useEffect, useState } from "react";

const Detector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let stream: MediaStream | undefined;
    const getVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, aspectRatio: 1 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setErro(true);
      }
    };

    getVideo();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    let requestAnimationFrameId: number | undefined;

    const drawVideoOnCanvas = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          const squareSize = canvasRef.current.width * 0.5;
          const x = (canvasRef.current.width - squareSize) / 2;
          const y = (canvasRef.current.height - squareSize) / 2;
          context.strokeStyle = "red";
          context.lineWidth = 5;
          context.strokeRect(x, y, squareSize, squareSize);
        }
      }
      requestAnimationFrameId = requestAnimationFrame(drawVideoOnCanvas);
    };

    drawVideoOnCanvas();

    return () => {
      if (requestAnimationFrameId !== undefined) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const _size = Math.min(window.innerWidth, window.innerHeight);
        const size = Math.min(_size, 700);
        canvasRef.current.width = size;
        canvasRef.current.height = size;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="detector-container">
      {erro ? (
        <p className="error-text" style={{ textAlign: "center" }}>
          Permissão Negada! Para autorizar o acesso á câmera acesse as
          configurações do seu navegador.
        </p>
      ) : (
        <>
          <video ref={videoRef} autoPlay style={{ display: "none" }} />
          <canvas ref={canvasRef} />
        </>
      )}
    </div>
  );
};

export default Detector;
