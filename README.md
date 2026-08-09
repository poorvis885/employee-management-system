Markdown# 🚀 Employee Operations Center

A lightweight, full-stack **Employee Management System** built using **Node.js**, **Express.js**, **NeDB** (NoSQL datastore), and **Vanilla JavaScript**. Features complete CRUD operations, real-time analytics, authentication guard, client/server validations, and instant CSV exports.

---

## ✨ Key Features

- 🔐 **Authentication & Security:** Protected dashboard routes with session persistence (`localStorage`), login authentication, and explicit logout handling.
- 📊 **Real-time Analytics:** Automated live computation of Total Headcount, Monthly Payroll (INR), and Active Department counts.
- ⚡ **Full CRUD Capabilities:** Add, view, edit/update, and delete employee records without page reloads.
- 🛡️ **Data Integrity & Validation:** Server-side and client-side duplicate prevention for unique **Employee Codes** and **Email Addresses**.
- 🔍 **Dynamic Search & Filtering:** Live text filter across name, code, email, or designation, paired with department dropdown filtering.
- 📥 **Report Export:** One-click CSV/Excel report generation with automated filename timestamping.
- 💬 **User Experience:** Non-blocking dynamic toast alerts and responsive modal dialogs.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+ Fetch API) |
| **Backend** | Node.js, Express.js |
| **Database** | NeDB-Promises (Embedded NoSQL, local file persistence) |
| **Middleware** | CORS, Express JSON parser, Express Static File Server |

---

## 📁 Project Structure

```text
employee-management-system/
├── employee-backend/
│   ├── employees.db      # Auto-generated NoSQL database file
│   ├── index.html        # Main Dashboard Frontend
│   ├── login.html        # Authentication Frontend
│   ├── package.json      # Dependencies & Scripts
│   └── server.js         # REST API Server & File Router
├── .gitignore            # Ignores node_modules
└── README.md             # Project Documentation
⚙️ Installation & Local SetupPrerequisitesNode.js installed on your machine.Setup InstructionsClone the Repository:Bashgit clone [https://github.com/poorvis885/employee-management-system.git](https://github.com/poorvis885/employee-management-system.git)
cd employee-management-system/employee-backend
Install Dependencies:Bashnpm install
Start the Express Server:Bashnode server.js
Access the Application:Open your browser and navigate to:Plaintexthttp://localhost:5000
🔑 Default Login CredentialsRoleUsernamePasswordAdministratoradminadmin123🔌 REST API ReferenceMethodEndpointDescriptionPOST/api/loginAuthenticate user credentialsGET/api/employeesRetrieve all employee recordsPOST/api/employeesCreate a new employee record (Checks duplicate code & email)PUT/api/employees/:idUpdate existing record by ID (Validates uniqueness against other records)DELETE/api/employees/:idRemove an employee record by ID📝 LicenseThis project is open-source and available under the MIT License.
<ElicitationsGroup message="README update karne ke baad aage kya karna hai?">

{/* Reason: Giving simple options to push README to GitHub or prepare project presentation */}

  <Elicitation label="Push updated README.md to GitHub" query="README.md create kar li hai, isko GitHub repository par push karne ka command do."/>
  <Elicitation label="Prepare Viva / Interview explanation summary" query="Is project ke technical architecture aur Viva Q&A preparation guide generate kar do."/>
</ElicitationsGroup>
