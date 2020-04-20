![Node.js CI](https://github.com/caragpe/athletes-react/workflows/Node.js%20CI/badge.svg?branch=master)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all the dependencies included in `package.json`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

The tests included here are related with the React app, both the API calls and (some) component rendering.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## End-to-End testing

We are using Cypress as automation framework. The end-to-end tests are located inside `cypress\integration\olympics\e2e`. There are several options available to execute the tests:

### `yarn e2e`

Launches Cypress GUI and displays the end-to-end tests available

### `yarn ci-e2e`

Launches Cypress in headless mode, and tests a subset of the e2e testing framework.

### `yarn cli-e2e`

Launches Cypress in headless mode, similarly as how it would run on a CI pipeline. All the available test suite is tested.

## Backend testing

As we also need a solution that help us test the backend node app, these tests are a prove of concept about the capabilities of Cypress to automate an API test suite.

For testing the backend it is necessary to run the node server in what we have called `TEST mode`. For more information, please check this [documentation](https://github.com/caragpe/athletes-node/blob/master/readme.md#running-the-application-in-test-mode) in the node backend repo.

### `yarn backend`

Launches Cypress GUI and displays just the backend test available

### `yarn ci-backend`

Launches Cypress in headless mode, similarly to the way a CI pipeline would do.