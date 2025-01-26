from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from detector import Detector
from img_base64_to_matlike import img_base64_to_matlike

app = Flask(__name__)
CORS(app)

# Carregar o modelo YOLO
model = YOLO("./model.pt")  # Substitua pelo caminho correto do modelo
detector = Detector(model)

@app.route('/')
def index():
    return "OK"

@app.route('/detect', methods=['POST'])
def detect():
    body = request.get_json()
    base64_img = body['base64_img']
    confianca = body['confianca']

    matlike_img = img_base64_to_matlike(base64_img)
    boundboxes = detector.detectar(matlike_img, confianca)
    boundboxes_dicts = [boundbox.toDict() for boundbox in boundboxes]


    matlike_img.shape
    responseBody = {
        "metadata": {
            "img_shape": matlike_img.shape,
        },
        "data": {
            "boundboxes": boundboxes_dicts
        }
    }
    return jsonify(responseBody)

