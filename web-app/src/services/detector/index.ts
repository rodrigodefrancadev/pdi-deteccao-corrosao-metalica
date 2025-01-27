import { confiancaPadrao } from "../../data";
import DetectorService from "./detector.service";
import OnnxDetector from "./detectores/onnx-detector/onnx-detector";

const detectorApi = new OnnxDetector();

const detectorService = new DetectorService(detectorApi, confiancaPadrao);

export default detectorService;
