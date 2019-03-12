# Jam3 Generator [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges)

Jam3 Frontend App Generator with no build configuration and no prompts.

* [Usage](#usage)
* [Developer Contribution Guide](https://github.com/Jam3/nyg-jam3/blob/master/CONTRIBUTING.md) – Read first if you are a developer
* [Main scripts](#main-scripts) – Running scripts
* [Developer Guide](#developer-guide) – How to develop apps bootstrapped with the generator

## Usage

The nyg generator is designed to function similar to yeoman. To get it running, simply follow these steps:

```bash
npm i nyg -g
npm i nyg-jam3 -g
cd your-project-directory
nyg nyg-jam3
```

## Developer Contribution Guide

#### Contribute with boilerplate

1.  Go to `/templates`
2.  Run `npm i`
3.  Ready to go, everything is inside that folder

#### Contribute with the generation

1.  Review `/index.js`, everything is there

If you are looking to contribute with the generator is important to read the [Developer Contribution Guide](https://github.com/Jam3/nyg-jam3/blob/master/CONTRIBUTING.md)

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

### `npm run release`

To releasing new versions we are using [standard-version](https://github.com/conventional-changelog/standard-version).

Steps:

1.  When PRs/commits land to your master branch, select the Squash and Merge option.
2.  Add a title and body that follows the [Conventional Commits Specification](https://www.conventionalcommits.org).
3.  Run `$ git checkout master; git pull origin master`
4.  Run `$ npm run release`
5.  Run `$ git push --follow-tags origin master && npm publish`

## Developer Guide

We are using `react-scripts` as a base; you can checkout their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md). Everything here applies the generator.

You can checkout our [Developer Guides](https://github.com/Jam3/nyg-jam3/blob/master/templates/docs/DEVELOPER_GUIDE.md) to know more about the features and customizations.
