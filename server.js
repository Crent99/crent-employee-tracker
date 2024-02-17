const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Goravens8!',
        database: 'employee_db'
    });

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
 console.log('Connected to the employees_db database.');
  startApp();
});

function startApp() {
    inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Update Employee Role',
            'Exit'
        ]
    })
    .then((answers) => {
        switch (answers.choices) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                break;
        }
    });
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        startApp();
    });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        startApp();
    });
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        startApp();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter employee role ID:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter employee manager ID:'
        }
    ])
    .then((answers) => {
        db.query('INSERT INTO employee SET ?', answers, function (err, results) {
            if (err) {
                console.error(err);
            }
            startApp();
        });
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter department name:'
        }
    ])
    .then((answers) => {
        db.query('INSERT INTO department SET ?', answers, function (err, results) {
            if (err) {
                console.error(err);
            }
            startApp();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter department ID:'
        }
    ])
    .then((answers) => {
        db.query('INSERT INTO role SET ?', answers, function (err, results) {
            if (err) {
                console.error(err);
            }
            startApp();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter new role ID:'
        }
    ])
    .then((answers) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], function (err, results) {
            if (err) {
                console.error(err);
            }
            startApp();
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});