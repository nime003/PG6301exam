import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Activities = ({ user = {} }) => {

    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            setError("No user data provided");
            return;
        }

        const fetchActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/activities`);
                if (response.data) {
                    setActivities(response.data);
                } else {
                    setError("Failed to fetch activities.");
                }
            } catch (error) {
                setError("An error occurred while fetching activities.");
            }
        }

        fetchActivities();
    }, [user]);

    const assignActivity = async (activity) => {
        try {
            const response = await axios.post('http://localhost:4000/assignActivity', {
                username: user.username,
                activity
            });

            if (response.data.success) {
                console.log(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Error assigning activity. Please try again.");
        }
    }

    return (
        <div>
            {error ? (
                <div>{error}</div>
            ) : (
                <>
                    <h2>Activities for {user?.occupancy}</h2>
                    <ul>
                        {activities.map((activity, index) => (
                            <li key={index}>
                                {activity.task}
                                <button onClick={() => assignActivity(activity)}>Assign to me</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Activities;