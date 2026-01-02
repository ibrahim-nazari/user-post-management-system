import { BrowserRouter, Link } from "react-router-dom";
import Router from "./router";
import Providers from "./providers";
import { useAuth } from "@/hooks/useAuth";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <BrowserRouter>
      <Providers>
        <header className="py-5 px-10">
          <nav className="flex items-center justify-between">
            <Link to="/">
              <div>Logo</div>
            </Link>
            <div>
              {isAuthenticated ? (
                <button className="cursor-pointer" onClick={logout}>
                  logout
                </button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </nav>
        </header>
        <Router />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
