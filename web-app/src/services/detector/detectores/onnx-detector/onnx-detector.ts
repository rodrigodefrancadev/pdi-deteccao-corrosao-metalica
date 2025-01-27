import * as ort from "onnxruntime-web";
import { ImageInput, Boundbox, Detector } from "../../types";
import OnnxruntimeWebYolo11, {
  Detection,
  IDetectionModel,
} from "./onnxruntime-web-yolo11";

export default class OnnxDetector implements Detector {
  private _detectionModel?: IDetectionModel;

  constructor(private modelUrl: string, wasmUrl: string) {
    ort.env.wasm.wasmPaths = {
      wasm: wasmUrl,
    };
  }

  public async detectar(
    imageInput: ImageInput,
    confianca: number
  ): Promise<Boundbox[]> {
    const inputTensor = this.imageInputToOnnxTensor(imageInput);
    const model = await this.getModel();
    const detections = await model.detect(inputTensor, confianca);
    const boundboxes = detections.map(this.detectionToBoundBox);
    return boundboxes;
  }

  private imageInputToOnnxTensor(imageInput: ImageInput): ort.Tensor {
    const imageData = imageInput.getImageData();
    const imageTensor = OnnxruntimeWebYolo11.imageDataToOnnxTensor(imageData);
    return imageTensor;
  }

  private async getModel() {
    if (this._detectionModel) {
      return this._detectionModel;
    }

    const detectionModel = await OnnxruntimeWebYolo11.createDetectionModel(
      this.modelUrl
    );
    this._detectionModel = detectionModel;
    return detectionModel;
  }

  private detectionToBoundBox(detection: Detection): Boundbox {
    const boundbox: Boundbox = {
      classe: detection.classId.toString(),
      confianca: detection.confidence,
      x1: detection.box.x,
      y1: detection.box.y,
      x2: detection.box.x + detection.box.width,
      y2: detection.box.y + detection.box.height,
    };
    return boundbox;
  }
}
