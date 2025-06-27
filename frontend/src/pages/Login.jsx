function Login() {
    return (
        <form className="login">
            <h3>Log in</h3>
            <label>Email:</label>
            <input type="email" required />

            <label>Password:</label>
            <input type="password" required />
            {/*   disabled on load   */}
            <button>Login</button>
            <div className="error">error</div>
        </form>
    );
}

export default Login;
