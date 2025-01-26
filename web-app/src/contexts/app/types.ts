export enum Pagina {
  HOME = "HOME",
  APP = "APP",
}

export interface IAppContext {
  navegarPara: (pagina: Pagina) => void;
}
