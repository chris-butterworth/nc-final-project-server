import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ModeProvider } from "./context/Mode.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <CssBaseline />
        <App />
      </ModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

