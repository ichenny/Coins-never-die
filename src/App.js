import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upbit from "./components/Upbit";
import Detail from "./components/Detail";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:market" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
