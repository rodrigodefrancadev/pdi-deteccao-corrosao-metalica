import React, { useRef, useEffect } from "react";

const Detector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | undefined;
    const getVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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

  return (
    <div className="detector-container">
      <video ref={videoRef} autoPlay style={{ width: "100%" }} />
    </div>
  );
};

export default Detector;
