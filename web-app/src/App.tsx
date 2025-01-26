import "./App.css";
import AppContextProvider from "./contexts/app/provider";
import AppPage from "./pages/app";
import HomePage from "./pages/home";
function App() {
  return <AppContextProvider homePage={<HomePage />} appPage={<AppPage />} />;
}

export default App;
