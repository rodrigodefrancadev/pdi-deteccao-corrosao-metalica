from ultralytics import YOLO

model_path = "./runs/detect/train/weights/best.pt"
# Load the YOLO11 model
model = YOLO(model_path)
#model = YOLO(".yolo11n.pt")

# Export the model to ONNX format
model.export(format="onnx", dynamic=True)

