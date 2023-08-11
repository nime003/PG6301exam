const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'Users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')).users;
const activities = JSON.parse(fs.readFileSync(__dirname + '/data/activities.json', 'utf-8')).activities;
const assignedActivities = JSON.parse(fs.readFileSync(__dirname + '/data/assignedActivities.json', 'utf-8')).assignedActivities;
const loggedHours = JSON.parse(fs.readFileSync(__dirname + '/data/loggedHours.json', 'utf-8')).loggedHours || [];

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

//const users = JSON.parse(fs.readFileSync('data/Users.json', 'utf-8')).users;

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        delete foundUser.password;
        res.json({
            success: true,
            user: {
                ...foundUser,
                realName: foundUser.realName
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
});

//const activities = JSON.parse(fs.readFileSync('data/activities.json', 'utf-8')).activities;

app.get('/activities', (req, res) => {
    res.json(activities);
});

//const assignedActivities = JSON.parse(fs.readFileSync('data/assignedActivities.json', 'utf-8')).assignedActivities;

app.get('/userAssignments/:username', (req, res) => {
    const userAssignments = assignedActivities.filter(a => a.username === req.params.username);
    res.json(userAssignments);
});

app.post('/assignActivity', (req, res) => {
    const { username, activity } = req.body;
    if (assignedActivities.some(a => a.username === username && a.task === activity.task)) {
        return res.status(400).json({ success: false, message: 'Activity already assigned to this user.' });
    }

    assignedActivities.push({
        username,
        task: activity.task,
        occupancy: activity.occupancy
    });

    fs.writeFileSync('data/assignedActivities.json', JSON.stringify({ assignedActivities }));

    res.json({ success: true, message: 'Activity assigned successfully!' });
});

//const loggedHours = JSON.parse(fs.readFileSync('data/loggedHours.json', 'utf-8')).loggedHours || [];

app.post('/logHours', (req, res) => {
    const { username, task, hours } = req.body;
    if (!task || hours <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid assignment or hours.' });
    }

    const existingEntry = loggedHours.find(entry => entry.username === username && entry.task === task);

    if (existingEntry) {
        existingEntry.hours += hours;
    } else {
        loggedHours.push({ username, task, hours });
    }

    try {
        fs.writeFileSync('data/loggedHours.json', JSON.stringify({ loggedHours }), 'utf-8');
        res.json({ success: true, message: 'Hours logged successfully!' });
    } catch (err) {
        console.error("Error writing to loggedHours.json:", err);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;