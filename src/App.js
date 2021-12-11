import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [home, sethome] = useState(false);
  const handlepage = (val) => {
    sethome(val);
  };
  return (
    <div className="App">
      {home == false ? <Login check={handlepage} /> : <Home />}
    </div>
  );
}

export default App;
