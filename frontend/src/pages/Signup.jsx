function Signup() {
    return (
        <form className="signup">
            <h3>Sign up</h3>

            <label>Email:</label>
            <input type="email" required />

            <label>Password:</label>
            <input type="password" required />

            {/*   disabled on load   */}
            <button>Sign up</button>
            <div className="error">error</div>
        </form>
    );
}

export default Signup;
