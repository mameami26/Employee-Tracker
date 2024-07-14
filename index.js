const inquirer = require('inquirer');
const queries = require('./queries');

const startApp = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      const departments = await queries.getDepartments();
      console.table(departments);
      break;
    case 'View all roles':
      const roles = await queries.getRoles();
      console.table(roles);
      break;
    case 'View all employees':
      const employees = await queries.getEmployees();
      console.table(employees);
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
        },
      ]);
      await queries.addDepartment(departmentName);
      console.log('Department added!');
      break;
    case 'Add a role':
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
        },
      ]);
      await queries.addRole(title, salary, departmentId);
      console.log('Role added!');
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the manager ID for the employee (leave blank if none):',
        },
      ]);
      await queries.addEmployee(firstName, lastName, roleId, managerId || null);
      console.log('Employee added!');
      break;
    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID for the employee:',
        },
      ]);
      await queries.updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated!');
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  startApp();
};

startApp();
