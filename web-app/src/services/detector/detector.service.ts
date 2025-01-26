export interface Boundbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  classe: number;
  confianca: number;
}

export interface DetectorApi {
  detectar: (base64Img: string, confianca: number) => Promise<Boundbox[]>;
}

export default class DetectorService {
  private _boundboxAtuais: Boundbox[];
  private ocupado: boolean;
  private _erroApi: boolean;

  get boundboxes() {
    return this._boundboxAtuais;
  }

  constructor(private detectorApi: DetectorApi) {
    this._boundboxAtuais = [];
    this.ocupado = false;
    this._erroApi = false;
  }

  public async detectar(base64Img: string, confianca: number): Promise<void> {
    if (this.ocupado) {
      return;
    }

    this.ocupado = true;
    try {
      const novosBoundbox = await this.detectorApi.detectar(
        base64Img,
        confianca
      );
      this._boundboxAtuais = novosBoundbox;
      if (this._erroApi) {
        this._erroApi = false;
      }
    } catch {
      if (!this._erroApi) {
        this._erroApi = true;
        this._boundboxAtuais = [];
      }
    } finally {
      this.ocupado = false;
    }
  }
}
