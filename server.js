const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json
app.use(express.static('public'));

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@shankar4444',
    database: 'smart_home'
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Serve a basic HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM Users', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// API endpoint to get devices
app.get('/devices', (req, res) => {
    connection.query('SELECT * FROM Devices', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Add a new device
app.post('/devices', (req, res) => {
    const { device_name, device_type, location } = req.body;
    const sql = 'INSERT INTO Devices (device_name, device_type, location) VALUES (?, ?, ?)';
    connection.query(sql, [device_name, device_type, location], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Device added', id: results.insertId });
    });
});

// Delete a device
app.delete('/devices/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Devices WHERE device_id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Device deleted' });
    });
});

// Update a device
app.put('/devices/:id', (req, res) => {
    const { id } = req.params;
    const { device_name, device_type, location } = req.body;
    const sql = 'UPDATE Devices SET device_name = ?, device_type = ?, location = ? WHERE device_id = ?';
    connection.query(sql, [device_name, device_type, location, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Device updated' });
    });
});

// API endpoint to get rooms
app.get('/rooms', (req, res) => {
    connection.query('SELECT * FROM Rooms', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Add a new room
app.post('/rooms', (req, res) => {
    const { room_name, location } = req.body;
    db.query('INSERT INTO rooms (room_name, location) VALUES (?, ?)', [room_name, location], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Room added successfully!' });
    });
});

// Delete a room by ID
app.delete('/rooms/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM rooms WHERE room_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Room deleted successfully!' });
    });
});

// Update a room by ID
app.put('/rooms/:id', (req, res) => {
    const { id } = req.params;
    const { room_name, location } = req.body;
    db.query('UPDATE rooms SET room_name = ?, location = ? WHERE room_id = ?', [room_name, location, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Room updated successfully!' });
    });
});

// API endpoint to get schedules
app.get('/schedules', (req, res) => {
    connection.query('SELECT * FROM Schedules', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Add a new schedule
app.post('/schedules', (req, res) => {
    const { device_id, start_time, end_time, days_of_week } = req.body;
    db.query('INSERT INTO schedules (device_id, start_time, end_time, days_of_week) VALUES (?, ?, ?, ?)', [device_id, start_time, end_time, days_of_week], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Schedule added successfully!' });
    });
});

// Delete a schedule by ID
app.delete('/schedules/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM schedules WHERE schedule_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Schedule deleted successfully!' });
    });
});

// Update a schedule by ID
app.put('/schedules/:id', (req, res) => {
    const { id } = req.params;
    const { device_id, start_time, end_time, days_of_week } = req.body;
    db.query('UPDATE schedules SET device_id = ?, start_time = ?, end_time = ?, days_of_week = ? WHERE schedule_id = ?', [device_id, start_time, end_time, days_of_week, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Schedule updated successfully!' });
    });
});

// API endpoint to get device states
app.get('/device_states', (req, res) => {
    connection.query('SELECT * FROM Device_States', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Add a new device state
app.post('/device_states', (req, res) => {
    const { device_id, state, timestamp } = req.body;
    db.query('INSERT INTO device_states (device_id, state, timestamp) VALUES (?, ?, ?)', [device_id, state, timestamp], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Device state added successfully!' });
    });
});

// Delete a device state by ID
app.delete('/device_states/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM device_states WHERE state_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Device state deleted successfully!' });
    });
});

// Update a device state by ID
app.put('/device_states/:id', (req, res) => {
    const { id } = req.params;
    const { device_id, state, timestamp } = req.body;
    db.query('UPDATE device_states SET device_id = ?, state = ?, timestamp = ? WHERE state_id = ?', [device_id, state, timestamp, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Device state updated successfully!' });
    });
});



