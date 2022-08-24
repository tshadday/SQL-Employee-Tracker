const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'pass123',
      database: 'Job_db'
    },
    console.log(`Connected to the Job_db database.`)
);

function start() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "mainQuestion",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit"
            ]
        }
    ]).then((data) => {
        if (data.mainQuestion === "View all departments") {
            viewDepartments();
        } else if (data.mainQuestion === "View all roles") {
            viewRoles();
        } else if (data.mainQuestion === "View all employees") {
            viewEmployees();
        } else if (data.mainQuestion === "Add a department") {
            addDepartment();
        } else if (data.mainQuestion === "Add a role") {
            addRole();
        } else if (data.mainQuestion === "Add an employee") {
            addEmployee();
        } else if(data.mainQuestion === "Update an employee role") {
            updateEmployeeRole();
        } else {
            process.exit();
        }
    })
};

function viewDepartments() {
    var selection = 'SELECT * FROM department'
    db.query(selection, (err, res) => {
        if (err) {
            console.log(err);
        }

        var departmentTable = cTable.getTable(res);
        console.log(departmentTable);
    }),


    // return to start menu
    start();
};

function viewRoles() {
    var selection = 'SELECT * FROM roles';
    db.query(selection, (err, res) => {
        if (err) {
            console.log(err);
        }

        var rolesTable = cTable.getTable(res);
        console.log(rolesTable);
    });

    // return to start menu
    start();
};

function viewEmployees() {
    var selection = 'SELECT * FROM employee';
    db.query(selection, (err, res) => {
        if (err) {
            console.log(err);
        }

        var employeeTable = cTable.getTable(res);
        console.log(employeeTable);
    });

    // return to start menu
    start();
};

function addDepartment() {
    console.log("Adding New Department")
    inquirer
    .prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?"
        }
    ]).then((data) => {
        var department = data.newDepartment;
        var command = `INSERT INTO department (department_name) VALUES (${department})`
        db.query(command, (err, res) => {
            console.log(`Successfully added department: ${department}`);
        })

        // return to start menu
        start();
    });
};

function addRole() {
    console.log("Adding New Role")
    inquirer
    .prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the new role?"
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "What department is the new role in?"
        }
    ]).then((data) => {
        var role = data.roleName;
        var salary = data.roleSalary;
        var department = data.roleDepartment;
        var command = `INSERT INTO roles (title, salary, department_id) VALUES (${role}, ${salary}, ${department})`;

        db.query(command, (err, res) => {
            console.log(`Successfully added role: ${role}`);
        });

        // return to start menu
        start(); 
    })
};

function addEmployee() {
    console.log("Adding New Employee")
    inquirer
    .prompt([
        {
            type: "input",
            name: "employeeFirst",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "employeeLast",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "employeeRole",
            message: "What is the role of the new employee?"
        },
        {
            type: "input",
            name: "employeeManager",
            message: "What is the id of the employee's manager ('NULL' for none)?"
        }
    ]).then((data) => {
        var firstName = data.employeeFirst;
        var lastName = data.employeeLast;
        var role = data.employeeRole;
        var manager = data.employeeManager;
        var command = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (${firstName}, ${lastName}, ${role}, ${manager})`;
            
        db.query(command, (err, res) => {
            console.log(`Successfully added employee: ${department}`);
        });

        // return to start menu
        start();  
    })
};

function updateEmployeeRole() {

    
    // return to start menu
    start();
};

start();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});