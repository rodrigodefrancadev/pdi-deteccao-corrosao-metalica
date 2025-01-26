import { confiancaPadrao, detectorApiUrl } from "../../data";
import DetectorApiImp from "./detector.api";
import DetectorService from "./detector.service";

const apiUrl = detectorApiUrl;
const detectorApi = new DetectorApiImp(apiUrl);
const detectorService = new DetectorService(detectorApi, confiancaPadrao);

export default detectorService;
