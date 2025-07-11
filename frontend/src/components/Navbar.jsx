import { Link } from "react-router-dom";
import { useAuthConext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
    const { user } = useAuthConext();
    const {logout} = useLogout()
    function handleclick(){
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleclick}>Logout</button>
                        </div>    
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">login</Link>
                            <Link to="/signup">signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
