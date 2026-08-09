# 🚀 Employee Operations Center (Spring Boot REST API)

A full-stack **Employee Management System** built using **Java**, **Spring Boot REST API**, and **Vanilla JavaScript** frontend. Features full CRUD operations, authentication guard, client/server validations, real-time analytics, and instant CSV exports.

---

## ✨ Key Features

- 🔐 **Authentication & Security:** Protected dashboard routes with session persistence (`localStorage`), login authentication, and logout handling.
- 📊 **Real-time Analytics:** Automated live computation of Total Headcount, Monthly Payroll (INR), and Active Department counts.
- ⚡ **Full CRUD Operations:** Add, view, edit/update, and delete employee records via Spring Boot REST controllers.
- 🛡️ **Data Integrity & Validation:** Server-side duplicate prevention for unique **Employee Codes** and **Email Addresses**.
- 🔍 **Dynamic Search & Filtering:** Instant text search across name, code, email, or designation, paired with department dropdown filtering.
- 📥 **Report Export:** One-click CSV/Excel report generation with automated filename timestamping.
- 💬 **User Experience:** Non-blocking dynamic toast alerts and responsive modal dialogs.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Java, Spring Boot, REST API |
| **Frontend** | HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+ Fetch API) |
| **Build Tool** | Maven / Gradle |
| **Database / Datastore** | Embedded NoSQL / H2 Database |
| **Architecture** | RESTful Web Services (Controller - Service - Repository) |

---

## 📁 Project Structure

```text
employee-management-system/
└── employee-backend/
    ├── src/
    │   ├── main/
    │   │   ├── java/com/employee/
    │   │   │   ├── controller/      # REST API Controllers (@RestController)
    │   │   │   ├── model/           # Employee Data Model
    │   │   │   └── Application.java # Main Spring Boot Entrypoint
    │   │   └── resources/
    │   │       ├── static/          # index.html, login.html (Frontend UI)
    │   │       └── application.properties
    ├── pom.xml                      # Maven Dependencies
    └── README.md                    # Documentation
⚙️ Installation & Local SetupPrerequisitesJava JDK 17+Maven / IntelliJ IDEASetup InstructionsClone the Repository:Bashgit clone [https://github.com/poorvis885/employee-management-system.git](https://github.com/poorvis885/employee-management-system.git)
cd employee-management-system/employee-backend
Run Application using Spring Boot Maven Plugin:Bashmvn spring-boot:run
(Ya IntelliJ me Application.java file par Right-Click karke Run karein)Access the Application:Open your browser and navigate to:Plaintexthttp://localhost:5000
🔑 Default Login CredentialsRoleUsernamePasswordAdministratoradminadmin123🔌 REST API EndpointsMethodEndpointDescriptionPOST/api/loginAuthenticate user credentialsGET/api/employeesRetrieve all employee recordsPOST/api/employeesCreate a new employee record (Validates unique code & email)PUT/api/employees/{id}Update existing employee details by IDDELETE/api/employees/{id}Remove an employee record by ID
<ElicitationsGroup message="README update hone ke baad next kya karein?">

{/* Reason: Giving logical follow-up options for git push or viva preparation */}

  <Elicitation label="Push updated README to GitHub" query="Is naye Spring Boot README.md ko GitHub par push karne ke commands do."/>
  <Elicitation label="Prepare Spring Boot Viva Questions" query="Is Spring Boot REST API Employee project ke top 10 Viva interview questions aur answers batao."/>
</ElicitationsGroup>
