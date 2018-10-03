# Jam3 Generator [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges)

Jam3 Frontend App Generator with no build configuration and no prompts.

* [Usage](#usage)
* [Developer Contribution Guide](https://github.com/Jam3/generator-jam3/blob/master/CONTRIBUTING.md) – Read first if you are a developer
* [Developer Guide](#developer-guide) – How to develop apps bootstrapped with the generator
* [Main scripts](#main-scripts) – Running scripts

## Usage

[![NPM](https://nodei.co/npm/nyg-jam3.png)](https://www.npmjs.com/package/nyg-jam3)

To create a new project based on the generator there are a few ways:

1.  Using the generator npm package.
2.  Generate the output template.
3.  Copy and paste and update some values in the template.

### Using the npm package

The nyg generator is designed to function similar to yeoman. To get it running, simply follow these steps:
```bash
npm i nyg -g
npm i nyg-jam3 -g
cd your-project-directory
nyg nyg-jam3
```

### Generate the output template

Do this if you have the source code and want to generate a version ready to be used in a project.

1.  Make sure you are in the root of the generator
2.  Run `npm test`
3.  Copy/Paste the files in `/test/output/` into your project folder.
4.  Update the `README.md` and `package.json`

### Copy and paste

If you want to do the quick and raw path, just copy `templates` folder and review the post install that the generator is doing after copying the files: https://github.com/Jam3/intern-generator-jam3/blob/master/index.js#L23

Changes:

1.  Update nvm version in `.nvmrc`
2.  In the `package.json`, delete `gitDir` property inside `lint-staged`.

## Developer Contribution Guide

#### Contribute with boilerplate

1.  Go to `/templates`
2.  Run `npm i`
3.  Ready to go, everything is inside that folder

#### Contribute with the generation

1.  Review `/index.js`, everything is there

If you are looking to contribute with the generator is important to read the [Developer Contribution Guide](https://github.com/Jam3/generator-jam3/blob/master/CONTRIBUTING.md)

## Developer Guide

We are using `react-scripts` as a base; you can checkout their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md). Everything here applies the generator.

You can checkout our [Developer Guides](https://github.com/Jam3/generator-jam3/blob/master/templates/docs/DEVELOPER_GUIDE.md) to know more about the features and customizations.

## Main scripts

In the template, you can run:

### `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will automatically see the changes in your app after modifying your code, we are using [HMR](https://webpack.js.org/concepts/hot-module-replacement/).
You will also see build errors and warnings in the console as well as the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the random hash strings in order to avoid server-side caching. (example: main.df8fsdfs.js)<br>
By default, it also [includes a service worker](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

Before create the production build make sure removing everything you don't need. There are many samples in the generator to avoid prompting at the beginning of the project.

Your app is ready to be deployed.

### `npm test`

Runs the test watcher in an interactive mode.<br>
By default, it runs tests on the files that have changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

## Publishing to production

### Remove sample code

Before creating the production build make sure to remove everything you don't need. There are a lot of sample files included in the generator to make it easier to get started.

**Common places with sample code:**

* `/components` folder
* `/util` folder
* `/public` folder
* `/assets` folder
* `/pages` folder

Your app is ready to be deployed.

### `npm test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
