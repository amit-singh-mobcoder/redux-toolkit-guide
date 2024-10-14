import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Counter from "./components/Counter";
import Todos from "./components/Todos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
