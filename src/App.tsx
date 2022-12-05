import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Camera from "./views/Camera";
import About from "./views/About";
import Whiteboard from "./views/Whiteboard";
import Preferences from "./views/Preferences";
import Toolbar from "./views/Toolbar";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="camera" element={<Camera />} />
        <Route path="whiteboard" element={<Whiteboard />} />
        <Route path="toolbar" element={<Toolbar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
