import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ModeProvider } from "./context/Mode.jsx";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <ModeProvider>
        <CssBaseline />
        <App />
      </ModeProvider>
    </BrowserRouter>
 
);

