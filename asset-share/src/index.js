import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FileAppProvider } from "./context/FileContext";
import "./assets/fonts/Poppins-Regular.ttf";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FileAppProvider>
      <App />
    </FileAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
