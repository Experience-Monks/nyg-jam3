# Jam3 Generator Developer Guide

In this guide you will find the explanation behind every feature of the boilerplate and how to use it. This is a full
new template that is using the famous `create-react-app` structure. To checkout the
[create-react-app user guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)
follow the link.

## Table of Contents

* [Folder Structure](#folder-structure)
* [Available Scripts](#available-scripts)
* [Code styling](#code-styling)
* [Nodejs and npm](#nodejs-and-npm)
* [Git and LFS](#git-and-lfs)
* [Build scripts](#build-scripts)
* [Storybook](#storybook)

## Folder Structure

The idea of the generator is don't create magic in order to compose the final boilerplate, based on that idea everything
that is inside [templates](https://github.com/Jam3/generator-jam3-v2/tree/master/templates) will be what we will
generate.

## Available Scripts

`npm start` Run the development server

`npm run release | npm run build` Create the production version (located in `/build`)

`npm test` Run the unit tests

`npm run js-lint` Run the JS linters, we are using ESLint

`npm run sass-lint`: Run the SASS linters, we are using stylelint

`npm run precommit`: Git hook that will run before every commit, we are formatting the code here

`npm run prepush`: Git hook that will run before every push, we are linting all the code

`npm run storybook`: Run storybook

`npm run component`: Script to generate a pure components using best practices

`npm run stateless-component`: Script to generate a stateless component using best practices

`npm run connected-component`: Script to generate a connected to the store component using best practices

`npm run page`: Script to generate a connected to the store page using best practices

`npm run audit-nsp`: Run NSP to check vulnerabilities

`npm run audit-snyk`: Run Snyk to check vulnerabilities, disabled by default (price)

`npm run dependency-report`: Dependencies used in production, name|version|license|link

`npm run svg-component`: Create components for your SVGs

`npm run generate-doc`: Run the documentation creation, currently just SASS

## Code styling

In order to ensure the same code styling across the duration of the project we are using the next technologies:

* ESLint - JS Linter, `.eslintrc`
* StyleLint - Sass Linter, `.stylelintrc`
* Prettier - Code Formatter, `.prettierrc`
* EditorConfig - IDE|Editor configuration, `.editorconfig`

More information about linters [here](https://github.com/Jam3/standards/blob/master/LINTERS_STANDARDS.md)

## Nodejs and npm

The project has by default a file called `.nvmrc` that lock the nodejs and npm version you will use when you run the
scripts, it requires to have installed `nvm`. More information [here](https://github.com/creationix/nvm#nvmrc)

We included some basic information for npm in `.npmrc`, the most important is that when we install a npm package we are
including a specific version. This help us to avoid weird behaviors after a package is updated and help us to track and
control updates. More information [here](https://docs.npmjs.com/files/npmrc)

## Git and LFS

To know more about the (Jam3 Git Standards)[https://github.com/Jam3/standards/blob/master/GIT_STANDARD.md] follow the
link.

We included a default `.gitignore` ordered by topic, please follow the addition rules to keep it consistent.

You will find the Git LFS configuration in `.gitattribute`, currently we are tracking only the files inside:

* src/assets/sounds
* src/assets/videos

Before add your files to Git LFS have in mind a couple options:

1. Evaluate host those files outside of the repository, could be a CDN
2. In case you want to trick the cache and add a hash for those files use them inside specific components instead of the
   public folder

## Build scripts

Our build scripts are based on [react-scripts](https://www.npmjs.com/package/react-scripts), and under the hood is using
Webpack with different configurations for develop and production. The default configurations are stable and supported
for the community.

To customize the current build pipelines, refer to the file
[config-overrides.js](https://github.com/Jam3/generator-jam3-v2/blob/master/templates/config-overrides.js). If you wanna
read more about it, please visit the [react-app-rewired](https://github.com/timarney/react-app-rewired) repository.

### Built-in Customizations

#### Visualizer

Dependencies webpack visualizer, visit [npm](https://www.npmjs.com/package/webpack-visualizer-plugin) for more
information

#### Custom ESLint

We use the same rules than react-scripts plus some customizations

#### Hot Module Reload

Don't refresh your screen all the time, save time. We are using
[react-app-rewire-hot-loader](https://www.npmjs.com/package/react-app-rewire-hot-loader)

#### Compressing images by default

We added imagemin into the webpack pipeline, visit
[react-app-rewire-imagemin-plugin](https://www.npmjs.com/package/react-app-rewire-imagemin-plugin) for more information

## Components creation

TBD

1. `npm run component` & `npm run stateless-component`
2. Architecture
3. How to customize them

## Storybook

TBD

How to use it, guidelines.

## Performance

TBD

1. Split bundles
2. Split redux configuration
3. preload & precache
4. Bundle sizes
5. Async
6. Passive events
7. Debounce|throttle events

## Responsiveness

TBD

1. Breakpoint handler + rems using. Pros + Cons

## Unsupporting strategy

TBD

1. Included in the bundle, best practices

## Animations

TBD

1. Less by default

## React-Redux-Router

TBD

React v16 + React Router v4 + Redux. Don't be afraid to remove it :-)

## Assets

TBD

1. Basic use of assets, how webpack include them and add hash.
2. Async loading of some assets - in case we don't preload them
3. SVGs - there are two ways of using SVGs.
    1. Importing SVGs like other modules (react + webapck as url)
    ```
    import logo from './assets/logo.svg';
    ...
    <img src={logo} className="Landing-logo" alt="logo" />
    ```
    2. Generate SVGs into React component by running a node script. This option is to transform a whole directory. By default, `SvgComponents` in `src/components` is where all svg must be. All SVGs will be stored in `SvgComponents` folder and Svg Components will be created under new folder. Please check out `svg-component.js` script in `scripts` folder.
    
          NOTE: Please double check newly generated Svg components if there is any `eslint` issues.
    ```bash
    // Run command below
    $ npm run svg-component

    // Example result
    src/components/SvgComponents/logo.svg
    src/components/SvgComponents/some-icon.svg
    src/components/SvgComponents/Logo/Logo.js
    src/components/SvgComponents/SomeIcon/SomeIcon.js
    ```
    3. Transform a single SVG is working in progress

## General documentation

TBD

/docs

## Styling structure

TBD

1. Global files
2. Variables - global and specific
3. Mixins
4. Documentation
