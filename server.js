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

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
);

app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
}
);

app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
}
);

app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
}
);

app.post('/api/employees', (req, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });
}
);

app.post('/api/roles', (req, res) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [req.body.title, req.body.salary, req.body.department_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });
}
);

app.post('/api/departments', (req, res) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [req.body.name];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });
}
);

function promptUser() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all employees', 'View all roles', 'View all departments', 'Add employee', 'Add role', 'Add department', 'Update employee role']
        }
    ]);
};

promptUser()

    .then(data => {
        if (data.action === 'View all employees') {
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                console.table(rows);
            });
        }
        else if (data.action === 'View all roles') {
            const sql = `SELECT * FROM role`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                console.table(rows);
            });
        }
        else if (data.action === 'View all departments') {
            const sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                console.table(rows);
            });
        }
        else if (data.action === 'Add employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter employee first name:'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter employee last name:'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter employee role ID:'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Enter employee manager ID:'
                }
            ])
                .then(data => {
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                    const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
                    db.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Employee added.');
                    });
                });
        }
        else if (data.action === 'Add role') {
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
                    name: 'department_id',
                    message: 'Enter role department ID:'
                }
            ])
                .then(data => {
                    const sql = `INSERT INTO role (title, salary,
                    department_id) VALUES (?,?,?)`;
                    const params = [data.title, data.salary, data.department_id];
                    db.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Role added.');
                    });
                });
        }
        else if (data.action === 'Add department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter department name:'
                }
            ])
                .then(data => {
                    const sql = `INSERT INTO department (name) VALUES (?)`;
                    const params = [data.name];
                    db.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Department added.');
                    });
                });
        }
        else if (data.action === 'Update employee role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee_id',
                    message: 'Enter employee ID:'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter new role ID:'
                }
            ])
                .then(data => {
                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                    const params = [data.role_id, data.employee_id];
                    db.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Employee role updated.');
                    });
                });
        } else {
            console.log('Invalid action.');
        }
    }
);