import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthConext } from "./context/AuthContext";

function App() {
    const { user } = useAuthConext();
    return (
        <div className="app">
            <Navbar />
            <div className="pages">
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />}
                    />
                    <Route 
                        path="/signup" 
                        element={!user ? <Signup /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
