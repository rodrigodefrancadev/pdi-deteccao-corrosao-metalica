from ultralytics import YOLO

# Load the YOLO11 model
model = YOLO("./runs/detect/train4/weights/best.pt")
#model = YOLO(".yolo11n.pt")

# Export the model to ONNX format
model.export(format="onnx", dynamic=True)

