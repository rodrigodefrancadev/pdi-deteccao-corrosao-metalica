import { FC, ReactNode, useState } from "react";
import { Pagina } from "./types";
import AppContext from "./context";

interface AppContextProviderProps {
  homePage: ReactNode;
  appPage: ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({
  homePage,
  appPage,
}) => {
  const [paginaAtual, navegarPara] = useState(Pagina.HOME);

  return (
    <AppContext.Provider value={{ navegarPara }}>
      {paginaAtual === Pagina.HOME && homePage}
      {paginaAtual === Pagina.APP && appPage}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
