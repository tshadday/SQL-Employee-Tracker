INSERT INTO department (department_name)
VALUES  ('Human Resources'),
        ('Tech'),
        ('Sales'),
        ('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Manager', 9000, 1),
        ('HR', 80000, 1),
        ('Software Engineer', 130000, 2),
        ('Intern', 60000, 2),
        ('Salesperson', 80000, 3),
        ('Customer Service Staff', 70000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES  ('Timmy', 'Greenfield', 1, NULL),
        ('Bobby', 'Sue', 2, 1),
        ('Amanda', 'Eric', 3, 1),
        ('John', 'Greene', 4, 3),
        ('Sara', 'Sales', 5, NULL),
        ('Bradford', 'Wares', 6, 1);