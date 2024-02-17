INSERT INTO department(name) VALUES('Engineering'), ('Sales'), ('Finance'), ('Legal');
INSERT INTO role(title, salary, department_id) VALUES('Lead Engineer', 75000, 1), ('Sales Lead', 80000, 2), ('Accountant', 60000, 3), ('Legal Team Lead', 85000, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('John', 'Doe', 1, NULL), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3, NULL), ('Sarah', 'Linn', 4, 3);