import axios, { AxiosResponse } from "axios";
import { Boundbox, DetectorApi } from "./detector.service";

export default class DetectorApiImp implements DetectorApi {
  constructor(private apiUrl: string) {}

  public async detectar(
    base64Img: string,
    confianca: number
  ): Promise<Boundbox[]> {
    const requestData: RequestData = {
      base64_img: base64Img,
      confianca,
    };

    const response = await axios.post<
      unknown,
      AxiosResponse<ResponseData>,
      RequestData
    >(`${this.apiUrl}/detect`, requestData);
    return response.data.data.boundboxes;
  }
}

interface RequestData {
  base64_img: string;
  confianca: number;
}

interface ResponseData {
  data: {
    boundboxes: Boundbox[];
  };
  metadata: {
    img_shape: number[];
  };
}
