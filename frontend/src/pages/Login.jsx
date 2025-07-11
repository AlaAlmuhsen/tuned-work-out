import { useState } from "react";
import useAuthFetch from "../hooks/useAuthFetch";

 function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {fetchAuth, isLoading, error} = useAuthFetch('/api/user/login');

    async function handleSubmit(e) {
        e.preventDefault();

        await fetchAuth(email, password);
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Login;
