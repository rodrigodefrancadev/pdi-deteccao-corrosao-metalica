from ultralytics import YOLO

dataset_path = "C:/Detecao de Corrosao.v2i.yolov11/data.yaml" #adicione aqui o caminho do dataset
epochs=100
imgsz=640

def main():
    model = YOLO("yolo11n.pt")
    model.train(data=dataset_path, epochs=epochs, imgsz=imgsz)
    

if __name__ == '__main__':
    main()