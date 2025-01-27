import { confiancaPadrao, onnxModelUrl, onnxWasmUrl } from "../../data";
import DetectorService from "./detector.service";
import OnnxDetector from "./detectores/onnx-detector/onnx-detector";

const detectorApi = new OnnxDetector(onnxModelUrl, onnxWasmUrl);

const detectorService = new DetectorService(detectorApi, confiancaPadrao);

export default detectorService;
