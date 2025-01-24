import cv2
from ultralytics import YOLO

model_path = "./runs/detect/train2/weights/best.pt"
conf = 0.3

# Configurar o modelo YOLO
model = YOLO(model_path)  # Substitua pelo caminho correto do modelo

# Inicializar a captura da câmera (0 = câmera padrão)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Erro: Não foi possível acessar a câmera.")
    exit()

# Configurar a janela de exibição
cv2.namedWindow("Detecção em Tempo Real", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Detecção em Tempo Real", 800, 600)  # Define o tamanho da janela

while True:
    # Ler um frame da câmera
    ret, frame = cap.read()
    if not ret:
        print("Erro ao capturar frame da câmera.")
        break

    # Fazer a inferência com YOLO
    results = model.predict(frame, conf=conf)  # Ajuste o limite de confiança conforme necessário

    # Adicionar as detecções ao frame
    annotated_frame = results[0].plot()

    # Exibir o frame anotado
    cv2.imshow("Detecção em Tempo Real", annotated_frame)

    # Pressione 'q' para sair do loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar os recursos
cap.release()
cv2.destroyAllWindows()
