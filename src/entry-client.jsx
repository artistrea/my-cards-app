import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

ReactDOM.hydrateRoot(document.getElementById("app"), <App />);
console.log("hydrated");
