import React from 'react';
import '../css/GreetingsPage.css';
import { Link } from 'react-router-dom';

const GreetingsPage = ({ user }) => {
    return (
        <div className="greetings-page">
            <h2>Welcome, {user.realName}</h2>
            <div className="buttons-container">
                <button className="big-button">
                    <Link to="/activities">Activities</Link>
                </button>
                <button className="big-button">
                    <Link to="/loghours">Log hours</Link>
                </button>

                {user.isAdmin && (
                    <>
                        <button className="big-button">
                            <Link to="/manage-activities">Manage Activities</Link>
                        </button>
                        <button className="big-button">
                            <Link to="/manage-loghours">Manage Hours</Link>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default GreetingsPage;