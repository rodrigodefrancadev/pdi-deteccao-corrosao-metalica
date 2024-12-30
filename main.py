from ultralytics import YOLO
from multiprocessing import Process
from test_model import test_model

data = "C:/Users/rodri/projects/processamento-de-imagens/ferrugem/datasets/Rust Detection.v1i.yolov11-monoclass/data.yaml"
epochs=100
imgsz=640

def train_model():
    model = YOLO("yolo11n.pt")
    model.train(data=data, epochs=epochs, imgsz=imgsz)

def continue_training():
    model = YOLO("./runs/detect/train/weights/last.pt")
    model.train(data=data, epochs=epochs, imgsz=imgsz)

def menu(): 
    options = [
        {
            'value': 'train',
            'label': 'Treinar modelo',
            'action': train_model
        },
        {
            'value': 'continue_training',
            'label': 'Continuar treinamento anterior',
            'action': continue_training,
        },
        {
            'value': 'test_model',
            'label': 'Testar modelo',
            'action': test_model,
        },
    ]
    
    print("Escolha uma opção abaixo:")
    for index, option in enumerate(options):
        print(f"{index} - {option["label"]}")
    
    selected_index_str = input("Opção: ")
    selected_index = int(selected_index_str)
    selected_option = options[selected_index]
    
    action = selected_option["action"]
    p = Process(target=action)
    p.start()
    p.join()



    

if __name__ == '__main__':
    menu()