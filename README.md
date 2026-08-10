# 🏢 Employee Operations Center (EOC)

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20NeDB%20%7C%20Spring%20Boot-informational?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A full-stack enterprise **Employee Operations & Analytics Dashboard** built to streamline headcount management, payroll distribution, and role-based data visibility. Designed with interactive **Chart.js visual analytics**, **dynamic multi-criteria filtering**, **interactive column sorting**, and robust **Role-Based Access Control (RBAC)**.

---

## ✨ Key Features

* 🛡️ **Role-Based Access Control (RBAC):**
  * **ADMIN Mode:** Full access to CRUD actions (Add, Edit, Delete), CSV Exports, and Monthly Payroll metrics.
  * **EMPLOYEE / VIEWER Mode:** Read-only interface with automated CSS guards hiding mutation controls.
* 📊 **Interactive Data Analytics (Chart.js):**
  * Live **Departmental Headcount** Doughnut Chart.
  * Real-time **Salary Budget Allocation** Bar Chart that updates dynamically as filters are applied.
* 🔍 **Advanced Search, Filtering & Sorting:**
  * **Instant Search:** Matches Name, Employee Code, Email, or Designation.
  * **Salary Range Filters:** Min & Max salary numeric threshold inputs.
  * **Department Dropdown:** Dynamic filtering by active departments.
  * **Multi-Column Sorting:** Header click sorting (Ascending/Descending) + Toolbar preset dropdown.
* ⚡ **Data Integrity & Server Validation:**
  * Embedded **NeDB** persistent data store.
  * Server-side unique checks preventing duplicate Employee Codes and Email addresses.
* 📥 **Export & Reporting:** One-click CSV report generation with formatted employee attributes.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Custom Variables, Flexbox, Grid), Vanilla JavaScript (ES6+ Fetch API) |
| **Data Visualization** | Chart.js |
| **Backend Options** | **Node.js + Express** (`server.js`) / **Java 17 + Spring Boot REST API** |
| **Database** | Embedded NoSQL Datastore (**NeDB**) / **H2 Database** |
| **Utilities** | CORS, `nedb-promises`, Express Static Middleware |

---

## 📁 Project Structure

```text
employee-management-system/
├── employee-backend/
│   ├── server.js                   # Node.js + Express REST API & Static File Server
│   ├── index.html                  # Main Operations Center Dashboard
│   ├── login.html                  # Authentication Gateway
│   ├── employees.db                # NeDB Embedded Database File
│   ├── package.json                # Node Dependencies
│   └── src/                        # Spring Boot Java Backend Structure
│       └── main/
│           ├── java/com/employee/  # Spring Controllers, Models, Repositories
│           └── resources/
│               └── static/         # Frontend Static Files Mirror
└── README.md                       # Documentation
🔑 Default CredentialsRoleUsernamePasswordAccessible ActionsAdministratoradminadmin123Full CRUD, CSV Export, Payroll Metrics, AnalyticsEmployeeuseruser123Read-only Table, Search, Multi-Filter, Analytics⚙️ Local Setup & InstallationOption 1: Node.js + Express Backend (Recommended)Clone Repository:Bashgit clone [https://github.com/poorvis885/employee-management-system.git](https://github.com/poorvis885/employee-management-system.git)
cd employee-management-system/employee-backend
Install Dependencies:Bashnpm install
Start Node Server:Bashnode server.js
Access Portal:Navigate to http://localhost:5000 in your browser.Option 2: Java Spring Boot BackendNavigate to employee-backend/ directory.Run using Maven:Bashmvn spring-boot:run
Open http://localhost:5000 (or http://localhost:8080 based on application.properties).🔌 REST API ReferenceMethodEndpointDescriptionValidation / ConstraintsPOST/api/loginAuthenticate user credentialsValidates against ADMIN and EMPLOYEE rolesGET/api/employeesFetch all employee recordsReturns JSON ArrayPOST/api/employeesAdd a new employeeRequires unique code & emailPUT/api/employees/:idUpdate existing record by IDValidates duplicate conflicts against other IDsDELETE/api/employees/:idRemove an employee recordAdmin-restricted action👤 AuthorPoorvi ShrivastavaGitHub: @poorvis885
