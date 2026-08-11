const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb-promises');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Safely define Spring Boot static resources path if it exists
const springStaticPath = path.join(__dirname, 'src', 'main', 'resources', 'static');

// Express ko bolo ki jab bhi '/' load ho, 'employee-backend' folder ki index.html hi bheje
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Serve static files (HTML, CSS, JS) from root and static folders
app.use(express.static(__dirname));
if (fs.existsSync(springStaticPath)) {
    app.use(express.static(springStaticPath));
}

// Initialize NeDB Database
const db = Datastore.create({ filename: 'employees.db', autoload: true });

// 1. Root Route: Serve login.html if exists, otherwise index.html
app.get('/', (req, res) => {
    const loginPath = path.join(__dirname, 'login.html');
    const indexPath = path.join(__dirname, 'index.html');

    if (fs.existsSync(loginPath)) {
        return res.sendFile(loginPath);
    } else if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    } else {
        return res.status(404).send(`<h2>❌ Neither login.html nor index.html found in ${__dirname}</h2>`);
    }
});

// 2. Dashboard Route (/index.html)
app.get('/index.html', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const springIndexPath = path.join(springStaticPath, 'index.html');

    if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    } else if (fs.existsSync(springIndexPath)) {
        return res.sendFile(springIndexPath);
    } else {
        return res.status(404).send(`<h2>❌ index.html missing in project directory</h2>`);
    }
});

// 3. Login API Route (ADMIN & EMPLOYEE Roles)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') {
        res.json({
            success: true,
            message: 'Admin Login successful',
            user: { username: 'Admin User', role: 'ADMIN' }
        });
    } else if (username === 'user' && password === 'user123') {
        res.json({
            success: true,
            message: 'Employee Login successful',
            user: { username: 'Employee / Viewer', role: 'EMPLOYEE' }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid Username or Password' });
    }
});

// 4. Employee CRUD API Routes

// GET: Fetch all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await db.find({});
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Add new employee (With duplicate Code & Email checks)
app.post('/api/employees', async (req, res) => {
    try {
        const { code, name, email, department, designation, salary } = req.body;

        if (!code || !name || !email) {
            return res.status(400).json({ error: 'Code, Name, and Email are required!' });
        }

        const formattedCode = code.trim();
        const formattedEmail = email.trim().toLowerCase();

        // Unique Validation Checks
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

// PUT: Update employee details
app.put('/api/employees/:id', async (req, res) => {
    try {
        const { code, email } = req.body;
        const currentId = req.params.id;

        const formattedCode = code.trim();
        const formattedEmail = email.trim().toLowerCase();

        // Unique Validation Checks against other IDs
        const existingCode = await db.findOne({ code: formattedCode, _id: { $ne: currentId } });
        if (existingCode) return res.status(400).json({ error: `Employee Code '${formattedCode}' belongs to another employee!` });

        const existingEmail = await db.findOne({ email: formattedEmail, _id: { $ne: currentId } });
        if (existingEmail) return res.status(400).json({ error: `Email '${formattedEmail}' belongs to another employee!` });

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

// DELETE: Remove employee by ID
app.delete('/api/employees/:id', async (req, res) => {
    try {
        await db.remove({ _id: req.params.id });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Pagination State
let currentPage = 1;
let pageSize = 10;
let currentFilteredData = [];
function filterData() {
    const searchTerm = (document.getElementById('searchInput').value || '').toLowerCase();
    const selectedDept = document.getElementById('deptFilter').value;
    const minSal = Number(document.getElementById('minSalary').value) || 0;
    const maxSal = Number(document.getElementById('maxSalary').value) || Infinity;
    const sortVal = document.getElementById('sortFilter').value;

    // 1. Filtering
    let filtered = allEmployees.filter(emp => {
        const matchSearch = (emp.name || '').toLowerCase().includes(searchTerm) ||
            (emp.code || '').toLowerCase().includes(searchTerm) ||
            (emp.designation || '').toLowerCase().includes(searchTerm) ||
            (emp.email || '').toLowerCase().includes(searchTerm);

        const matchDept = selectedDept === '' || emp.department === selectedDept;
        const sal = Number(emp.salary) || 0;
        const matchSalary = sal >= minSal && sal <= maxSal;

        return matchSearch && matchDept && matchSalary;
    });

    // 2. Sorting
    const [field, dir] = sortVal.split('-');
    currentSortState = { field, dir };
    updateSortIcons(field, dir);

    filtered.sort((a, b) => {
        let valA = a[field] ?? '';
        let valB = b[field] ?? '';

        if (field === 'salary') {
            valA = Number(valA) || 0;
            valB = Number(valB) || 0;
        } else {
            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();
        }

        if (valA < valB) return dir === 'asc' ? -1 : 1;
        if (valA > valB) return dir === 'asc' ? 1 : -1;
        return 0;
    });

    // Store global reference & reset to page 1 on filter change
    currentFilteredData = filtered;
    currentPage = 1;

    renderStats(filtered);
    renderCharts(filtered);
    updatePaginatedTable();
}

// Render environment port support (Default: 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});