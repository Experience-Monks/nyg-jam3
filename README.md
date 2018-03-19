# Jam3 Generator [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges)

Jam3 Basic Frontend Application Generator with no build configuration and no prompts

* [Generate an App](#generate-an-app) – How to generate a new app.
* [Developer Contribution Guide](https://github.com/Jam3/generator-jam3-v2/blob/master/CONTRIBUTING.md) – Read this first if you are a developer
* [User Guide](#user-guide) – How to develop apps bootstrapped with the generator

## Generate an app

[![NPM](https://nodei.co/npm/nyg-jam3.png)](https://www.npmjs.com/package/nyg-jam3)

The nyg generator is designed to function similar to yeoman. To get it running, simply follow these steps:

```bash
npm i nyg -g
npm i nyg-jam3 -g
cd your-project-directory
nyg nyg-jam3
```

Inside the newly created project, you can run some built-in commands:

### `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will see automatically the changes in your app after modify the code, we are using HMR. You will see the build errors and lint warnings in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
By default, it also [includes a service worker](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

Your app is ready to be deployed.

### `npm test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

## User Guide

We are using `react-scripts` as a base you can checkout their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)

You can checkout the [Extended User Guides]() to know more about the customizations.
