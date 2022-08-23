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
    console.log('Employee Manager!')
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
            //Close terminal
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

    })
};

function addRole() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};

start();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  