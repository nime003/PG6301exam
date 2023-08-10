import React from 'react';

const LoginPage = () => {
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;