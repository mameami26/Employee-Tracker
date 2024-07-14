INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Accountant', 80000, 2),
('HR Manager', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Mike', 'Johnson', 3, NULL);
