from typing import List
from flask import json
from ultralytics import YOLO
import cv2

class BoundBox(object):
    def __init__(self, x1: float, y1: float, x2: float, y2: float, classe: int, confianca: float):
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
        self.classe = classe
        self.confianca = confianca

    def toDict(self):
        return  {
            'x1': self.x1,
            'y1': self.y1,
            'x2': self.x2,
            'y2': self.y2,
            'classe': self.classe,
            'confianca': self.confianca
        }

class Detector(object):
    def __init__(self, model: YOLO):
        self.model = model

    def detectar(self, img: cv2.typing.MatLike, confianca: float) -> List[BoundBox]:
        results = self.model.predict(
            source=img,
            conf=confianca,
            #save=True,
            #save_txt=False,
            #project="predicts",
            #name="results",
        )
        
        detections = results[0].boxes  # Bounding boxes detectadas

        # Converter as bounding boxes para uma lista
        bounding_boxes: List[BoundBox] = []
        h, w, _ = img.shape
        for box in detections:
            x1, y1, x2, y2 = box.xyxy[0]  # Coordenadas originais
            classe = self.model.names[int(box.cls[0])]  # Nome da classe
            confianca = float(box.conf[0])  # Confiança
            # Normalizar para 640x640
            bounding_boxes.append(
                BoundBox(
                    int(x1),
                    int(y1),
                    int(x2),
                    int(y2),
                    classe,
                    confianca
                )
            )
        return bounding_boxes
