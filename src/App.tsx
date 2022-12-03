import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stage from "./screens/Stage";
import About from "./screens/About";
import Whiteboard from "./screens/Whiteboard";
import Preferences from "./screens/Preferences";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Stage />} />
        <Route path="about" element={<About />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="stage" element={<Stage />} />
        <Route path="whiteboard" element={<Whiteboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
