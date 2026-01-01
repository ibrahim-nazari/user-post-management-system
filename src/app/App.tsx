import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Providers from "./providers";

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Router />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
