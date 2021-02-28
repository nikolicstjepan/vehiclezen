# Vehiclezen - best vehicle management app out there!

## How to run

1. `git clone https://github.com/nikolicstjepan/vehiclezen.git`
2. `cd vehiclezen`
3. `docker-compose up -d`

open [http://localhost:9999](http://localhost:9999)

## Backend

### About architecture

This in backend for vehicle management project. It was built with Clean Architecture in mind. It is:

1. Independent of Frameworks. All express related stuff is contained in web folder and it is easy to replace it with another web server.
2. Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
3. Independent of UI. The UI can change easily, without changing the rest of the system. A sample console app is displayed in `src/console` folder (more about that latter).
4. Independent of Database. You can swap out Mongo easily if you make changes to `src/data-access` folder.
5. Independent of any external agency. In fact your business rules (`user` and `vehicle` in this case) simply don’t know anything at all about the outside world.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app on port defined in .env file (by default on 24000).

You will also see logs in the console.

#### `npm test`

Launches the test runner.

#### `npm run db:seed`

To insert test data to the app.

### Console app

You can add user or vehicle using your console.

To add new vehicle you can type: `node src/console/app.js make vehicle -ma BMW -mo 316 -y 2020`

For help type: `node src/console/app.js make user -h`

To add new user you can type: `node src/console/app.js make user -u stjepan -p 123456`
For help type: `node src/console/app.js make vehicle -h`

## Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
