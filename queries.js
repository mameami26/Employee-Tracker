const pool = require('./db');

// Get all departments
const getDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

// Get all roles
const getRoles = async () => {
  const res = await pool.query('SELECT * FROM role');
  return res.rows;
};

// Get all employees
const getEmployees = async () => {
  const res = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, m.first_name as manager_first, m.last_name as manager_last
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  return res.rows;
};

// Add a department
const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Add a role
const addRole = async (title, salary, department_id) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

// Add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

// Update an employee's role
const updateEmployeeRole = async (employee_id, role_id) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
