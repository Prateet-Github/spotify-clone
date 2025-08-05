import { useEffect, useState } from "react";
import { Home } from "./Home";

function App() {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const expires_in = params.get("expires_in");

    if (access_token) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in);
      localStorage.setItem("token_time", Date.now().toString());
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Wait until next tick to let storage settle
    setIsTokenReady(true);
  }, []);

  if (!isTokenReady) return <div>Loading...</div>; // or null

  return <Home />;
}

export default App;
