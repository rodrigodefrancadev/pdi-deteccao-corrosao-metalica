export interface Boundbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  classe: string;
  confianca: number;
}

export interface DetectorApi {
  detectar: (base64Img: string, confianca: number) => Promise<Boundbox[]>;
}

export default class DetectorService {
  private _boundboxAtuais: Boundbox[];
  private _ocupado: boolean;
  private _erroApi: boolean;

  get boundboxes() {
    return this._boundboxAtuais;
  }

  get podeDetectar() {
    return !this._ocupado;
  }

  get erroApi() {
    return this._erroApi;
  }

  constructor(private detectorApi: DetectorApi) {
    this._boundboxAtuais = [];
    this._ocupado = false;
    this._erroApi = false;
  }

  public async detectar(base64Img: string, confianca: number): Promise<void> {
    if (this._ocupado) {
      return;
    }

    this._ocupado = true;
    return;
    try {
      const novosBoundbox = await this.detectorApi.detectar(
        base64Img,
        confianca
      );
      console.log("novosBoundbox: ", novosBoundbox);
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
      this._ocupado = false;
    }
  }
}
