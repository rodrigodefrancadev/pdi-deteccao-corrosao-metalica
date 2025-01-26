import React, { useRef, useEffect } from "react";

const Detector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | undefined;
    const getVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } }, // Use rear camera on mobile devices
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
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
        }
      }
      requestAnimationFrame(drawVideoOnCanvas);
    };

    drawVideoOnCanvas();
  }, []);

  return (
    <div className="detector-container">
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ width: "100%" }} />
    </div>
  );
};

export default Detector;
