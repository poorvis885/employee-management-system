const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb-promises');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from root directory
app.use(express.static(__dirname));

const db = Datastore.create({ filename: 'employees.db', autoload: true });

// 1. Root Route -> login.html
app.get('/', (req, res) => {
    const loginPath = path.join(__dirname, 'login.html');
    if (fs.existsSync(loginPath)) {
        res.sendFile(loginPath);
    } else {
        res.status(404).send(`<h2>❌ login.html missing in ${__dirname}</h2>`);
    }
});

// 2. Dashboard Route -> index.html
app.get('/index.html', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    console.log('🔍 Looking for index.html at:', indexPath);

    if (fs.existsSync(indexPath)) {
        console.log('✅ Found index.html! Loading Dashboard...');
        res.sendFile(indexPath);
    } else {
        console.log('❌ FAIL: index.html NOT found at:', indexPath);
        res.status(404).send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2 style="color: red;">❌ index.html File Missing!</h2>
        <p>Node.js is looking for <b>index.html</b> inside this exact directory:</p>
        <code style="background: #eee; padding: 10px; font-size: 16px;">${indexPath}</code>
        <p style="margin-top: 20px;">Please check IntelliJ and place <b>index.html</b> directly inside that folder.</p>
      </div>
    `);
    }
});

// 3. Authentication API Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid Username or Password' });
    }
});

// 4. Employee CRUD API Routes
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await db.find({});
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/employees', async (req, res) => {
    try {
        const newEmp = await db.insert(req.body);
        res.status(201).json(newEmp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/employees/:id', async (req, res) => {
    try {
        await db.update({ _id: req.params.id }, { $set: req.body });
        res.json({ message: 'Updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        await db.remove({ _id: req.params.id });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log('🚀 Server started on http://localhost:5000');
    console.log('📁 Root directory:', __dirname);
});