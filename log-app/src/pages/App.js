import React, { useState } from 'react';
import '../css/App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from 'react-router-dom';
import LoginPage from './LoginPage';
import GreetingsPage from './GreetingsPage';
import Activities from './Activities';
import LogHours from './LogHours';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

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
                        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
                        <Route path="/greetings" element={<GreetingsPage user={currentUser} />} />
                        <Route path="/activities" element={<Activities user={currentUser} />} />
                        <Route path="/loghours" element={<LogHours adminMode={false} />} />
                        <Route path="/manage-activities" element={<Activities user={currentUser} adminMode={true} />} />
                        <Route path="/manage-loghours" element={<LogHours adminMode={true} />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;