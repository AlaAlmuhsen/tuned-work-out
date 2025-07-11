import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { WorkoutContextProvider } from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider>
            <WorkoutContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </WorkoutContextProvider>
        </AuthContextProvider>
    </StrictMode>
);
