import React from "react";
import ReactDOM from "react-dom/client";
import HasprCursor from "haspr-cursor"; // Import Wrapper
import "haspr-cursor/dist/cursor.css"; // Import Style sheet
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HasprCursor>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HasprCursor>
);
