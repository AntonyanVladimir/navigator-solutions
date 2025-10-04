import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportDatabaseTarget } from "@/lib/database";

reportDatabaseTarget();

createRoot(document.getElementById("root")!).render(<App />);
