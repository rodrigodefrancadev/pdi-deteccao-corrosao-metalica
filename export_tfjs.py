from ultralytics import YOLO

# Load the YOLO11 model
model = YOLO("./runs/detect/train/weights/best.pt")

# Export the model to TF.js format
model.export(format="tfjs")  # creates '/yolo11n_web_model'

