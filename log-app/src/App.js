import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <h1>Welcome to Log-App</h1>
                                <p>Log in to access all features</p>
                                <Link to="/login">
                                    <button>Log In</button>
                                </Link>
                            </>
                        } />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;