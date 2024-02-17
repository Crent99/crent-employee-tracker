DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department(name) VALUES('Sales');
INSERT INTO department(name) VALUES('Engineering');
INSERT INTO department(name) VALUES('Finance');
INSERT INTO department(name) VALUES('Legal');

INSERT INTO role(title, salary, department_id) VALUES('Sales Lead', 100000, 1);
INSERT INTO role(title, salary, department_id) VALUES('Salesperson', 80000, 1);
INSERT INTO role(title, salary, department_id) VALUES('Lead Engineer', 150000, 2);
INSERT INTO role(title, salary, department_id) VALUES('Software Engineer', 120000, 2);
INSERT INTO role(title, salary, department_id) VALUES('Accountant', 125000, 3);
INSERT INTO role(title, salary, department_id) VALUES('Legal Team Lead', 250000, 4);
INSERT INTO role(title, salary, department_id) VALUES('Lawyer', 190000, 4);
INSERT INTO role(title, salary, department_id) VALUES('Legal Assistant', 75000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('John', 'Doe', 1, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Mike', 'Chan', 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Ashley', 'Rodriguez', 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Kevin', 'Tupik', 4, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Malia', 'Brown', 5, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Sarah', 'Lourd', 6, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Tom', 'Allen', 7, 5);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Tina', 'Lee', 8, 5);
