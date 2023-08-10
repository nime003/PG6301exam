import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogHours = ({ user }) => {

    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [hours, setHours] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/userAssignments/${user.username}`);
                if (response.data) {
                    setAssignments(response.data);
                } else {
                    setError("Failed to fetch assignments.");
                }
            } catch (error) {
                setError("An error occurred while fetching assignments.");
            }
        }

        fetchUserAssignments();
    }, [user]);

    const logHoursForAssignment = async () => {
        if (!selectedAssignment || hours <= 0) {
            setError('Please select an assignment and ensure logged hours are positive.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/logHours', {
                username: user.username,
                task: selectedAssignment,
                hours: parseFloat(hours)
            });

            if (response.data.success) {
                alert("Hours logged successfully!");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Error logging hours.");
        }
    }

    return (
        <div>
            {error && <div>{error}</div>}
            <h2>Log Hours</h2>
            <select value={selectedAssignment} onChange={(e) => setSelectedAssignment(e.target.value)}>
                <option value="" disabled>Select your assignment</option>
                {assignments.map((assignment, index) => (
                    <option key={index} value={assignment.task}>{assignment.task}</option>
                ))}
            </select>
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" />
            <button onClick={logHoursForAssignment}>Log Hours</button>
        </div>
    );
}

export default LogHours;