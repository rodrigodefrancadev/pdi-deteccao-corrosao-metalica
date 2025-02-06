import os
from ultralytics import YOLO

model_path = './runs/detect/train/weights/best.pt';

def test_model(model_path, output_folder):
    # Configurações
    input_folder = "./test_images/input"  # Pasta contendo as imagens

    # Carregar o modelo treinado
    model = YOLO(model_path)

    # Criar a pasta de saída, se não existir
    os.makedirs(output_folder, exist_ok=True)

    # Listar todas as imagens na pasta de entrada
    image_files = [f for f in os.listdir(input_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    image_paths = [os.path.join(input_folder, img_file) for img_file in image_files]

    # Fazer inferência na imagem
    results = model.predict(source=image_paths, save=True, save_txt=False, project=output_folder, name="results")
    

    print("Teste concluído!")

if __name__ == '__main__':
    test_model(model_path, './test_images')
