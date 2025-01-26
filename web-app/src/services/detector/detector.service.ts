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
  private _confianca: number;

  get boundboxes() {
    return this._boundboxAtuais;
  }

  get podeDetectar() {
    return !this._ocupado;
  }

  get erroApi() {
    return this._erroApi;
  }

  get confianca() {
    return this._confianca;
  }

  public setConfianca(valor: number) {
    if (valor > 1 || valor < 0) {
      return;
    }

    this._confianca = valor;
  }

  constructor(private detectorApi: DetectorApi, confianca: number) {
    this._boundboxAtuais = [];
    this._ocupado = false;
    this._erroApi = false;
    this._confianca = confianca;
  }

  public async detectar(base64Img: string): Promise<void> {
    if (this._ocupado) {
      return;
    }

    this._ocupado = true;

    try {
      const novosBoundbox = await this.detectorApi.detectar(
        base64Img,
        this._confianca
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
      this._ocupado = false;
    }
  }
}
