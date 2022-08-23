const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");

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
        if (data === "View all departments") {
            viewDepartments();
        } else if (data === "View all roles") {
            viewRoles();
        } else if (data === "View all employees") {
            viewEmployees();
        } else if (data === "Add a department") {
            addDepartment();
        } else if (data === "Add a role") {
            addRole();
        } else if (data === "Add an employee") {
            addEmployee();
        } else if(data === "Update an employee role") {
            updateEmployeeRole();
        } else {
            prompt.ui.close();
        }
    })
};

function viewDepartments() {
    db.query('SELECT * FROM department'),
    function (err, results) {
        console.log(results)
    }

    // return to start menu
    start();
};

function viewRoles() {

};

function viewEmployees() {

};

function addDepartment() {

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
  