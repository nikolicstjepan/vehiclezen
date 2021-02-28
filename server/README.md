# Vehiclezen server

## About architecture

This in backend for vehicle management project. It was built with Clean Architecture in mind. It is:

1. Independent of Frameworks. All express related stuff is contained in web folder and it is easy to replace it with another web server.
2. Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
3. Independent of UI. The UI can change easily, without changing the rest of the system. A sample console app is displayed in `src/console` folder (more about that latter).
4. Independent of Database. You can swap out Mongo easily if you make changes to `src/data-access` folder.
5. Independent of any external agency. In fact your business rules (`user` and `vehicle` in this case) simply don’t know anything at all about the outside world.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app on port defined in .env file (by default on 24000).

You will also see logs in the console.

### `npm test`

Launches the test runner.

## Console app

You can add user or vehicle using your console.

To add new vehicle you can type: `node src/console/app.js make vehicle -ma BMW -mo 316 -y 2020`

For help type: `node src/console/app.js make user -h`

To add new user you can type: `node src/console/app.js make user -u stjepan -p 123456`
For help type: `node src/console/app.js make vehicle -h`
