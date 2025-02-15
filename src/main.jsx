import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { RosterProvider } from "./contexts/RosterContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RosterProvider>
      <App />
    </RosterProvider>
  </BrowserRouter>
);
