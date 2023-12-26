# React + Vite

You can run these commands to view the project : 
1.At first you open the new terminal
2.cd .\crud-app\
3.npm run dev
4.Open new terminal
5.cd .\crud-app\
6.json-server --watch db.json

İn this project validations work in order

This project is designed to run your own business. Here, the admin assigns tasks to his employees, and each employee can see these tasks in his personal profile. Guests can only see our service and the appropriate staff member

For all steps for admin :
1.First of all, on the login page, you need to enter login: "admin" and password: "admin" and log in.
2.You can create a new employee in the "usermanagnet" section and assign a position to this employee
3.In the "create task" section, you can assign a task to any employee
4.You can see all tasks in the "all task" section. Click on the task here to complete it immediately
you can see in detail. If the status of the task is red, the worker has not started the task; if it is yellow, it has started; if it is green, it is finished


For all steps for worker:
1.Only admin can register an employee
2.After logging in, the employee can see the tasks assigned to him in his personal profile
3.Here, after pressing the start button, you started working
4.And you change the status of that task to started
5.Here, after pressing the finish button, you finsihed working
6.And you change the status of that task to finished