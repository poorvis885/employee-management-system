const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb-promises');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Initialize NeDB Database
const db = Datastore.create({ filename: 'employees.db', autoload: true });

// Auto-Seed Default Employees if DB is empty (Guarantees live site is never 0)
async function seedDefaultData() {
    try {
        const count = await db.count({});
        if (count === 0) {
            await db.insert([
                { code: 'EMP001', name: 'Rahul Sharma', email: 'rahul@company.com', department: 'Engineering', designation: 'Software Engineer', salary: 65000, createdAt: new Date() },
                { code: 'EMP002', name: 'Priya Verma', email: 'priya@company.com', department: 'HR', designation: 'HR Specialist', salary: 50000, createdAt: new Date() },
                { code: 'EMP003', name: 'Aman Gupta', email: 'aman@company.com', department: 'Sales', designation: 'Account Executive', salary: 55000, createdAt: new Date() }
            ]);
            console.log('Default initial employees seeded successfully!');
        }
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}
seedDefaultData();

// 1. Static HTML Serving Routes
app.get('/', (req, res) => {
    const loginPath = path.join(__dirname, 'login.html');
    const indexPath = path.join(__dirname, 'index.html');

    if (fs.existsSync(loginPath)) {
        return res.sendFile(loginPath);
    } else if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    } else {
        return res.status(404).send('<h2>❌ Neither login.html nor index.html found</h2>');
    }
});

app.get('/index.html', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    }
    res.status(404).send('<h2>❌ index.html missing</h2>');
});

// 2. Auth API Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, message: 'Admin Login successful', user: { username: 'Admin User', role: 'ADMIN' } });
    } else if (username === 'user' && password === 'user123') {
        res.json({ success: true, message: 'Employee Login successful', user: { username: 'Employee / Viewer', role: 'EMPLOYEE' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid Username or Password' });
    }
});

// 3. Employee CRUD API Routes

// GET ALL Employees (Fixes Empty Dashboard)
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await db.find({});
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Single Employee by ID or Code (Fixes Blank Profile Page)
app.get('/api/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await db.findOne({ $or: [{ _id: id }, { code: id }] });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Add New Employee
app.post('/api/employees', async (req, res) => {
    try {
        const { code, name, email, department, designation, salary } = req.body;

        if (!code || !name || !email) {
            return res.status(400).json({ error: 'Code, Name, and Email are required!' });
        }

        const formattedCode = code.trim();
        const formattedEmail = email.trim().toLowerCase();

        const existingCode = await db.findOne({ code: formattedCode });
        if (existingCode) {
            return res.status(400).json({ error: `Employee Code '${formattedCode}' already exists!` });
        }

        const existingEmail = await db.findOne({ email: formattedEmail });
        if (existingEmail) {
            return res.status(400).json({ error: `Email '${formattedEmail}' already exists!` });
        }

        const newEmployee = await db.insert({
            code: formattedCode,
            name: name.trim(),
            email: formattedEmail,
            department: department ? department.trim() : 'Unassigned',
            designation: designation ? designation.trim() : 'Employee',
            salary: Number(salary) || 0,
            createdAt: new Date()
        });

        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT Update Employee
app.put('/api/employees/:id', async (req, res) => {
    try {
        const { code, email } = req.body;
        const currentId = req.params.id;

        const formattedCode = code.trim();
        const formattedEmail = email.trim().toLowerCase();

        const existingCode = await db.findOne({ code: formattedCode, _id: { $ne: currentId } });
        if (existingCode) return res.status(400).json({ error: `Employee Code belongs to another employee!` });

        const existingEmail = await db.findOne({ email: formattedEmail, _id: { $ne: currentId } });
        if (existingEmail) return res.status(400).json({ error: `Email belongs to another employee!` });

        await db.update({ _id: currentId }, {
            $set: {
                ...req.body,
                code: formattedCode,
                email: formattedEmail,
                salary: Number(req.body.salary) || 0
            }
        });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        await db.remove({ _id: req.params.id });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});