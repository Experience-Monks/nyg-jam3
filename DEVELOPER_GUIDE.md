
# Jam3 Generator Developer Guide

In this guide you will find the explanation behind every feature of the boilerplate and how to use it. To checkout the [base user guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) follow the link.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Code styling](#code-styling)
- [Nodejs and npm](#nodejs-and-npm)
- [Git and LFS](#git-and-lfs)

## Folder Structure

The idea of the generator is don't create magic in order to compose the final boilerplate, based on that idea everything that is inside [templates](https://github.com/Jam3/generator-jam3-v2/tree/master/templates) will be what we will generate.

## Available Scripts

`npm start` Run the development server

`npm run release | npm run build` Create the production version (located in `/build`)

`npm test` Run the unit tests

`npm run js-lint` Run the JS linters, we are using ESLint

`npm run sass-lint`: Run the SASS linters, we are using stylelint

`npm run precommit`: Git hook that will run before every commit, we are formatting the code here

`npm run prepush`: Git hook that will run before every push, we are linting all the code

`npm run storybook`: Run storybook

`npm run component`: Script to create components with the best practices

`npm run stateless-component`: Script to create staless component with the best practices

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
The project has by default a file called `.nvmrc` that lock the nodejs and npm version you will use when you run the scripts, it requires to have installed `nvm`. More information [here](https://github.com/creationix/nvm#nvmrc)

We included some basic information for npm in `.npmrc`, the most important is that when we install a npm package we are including a specific version. This help us to avoid weird behaviors after a package is updated and help us to track and control updates. More information [here](https://docs.npmjs.com/files/npmrc)

## Git and LFS
To know more about the (Jam3 Git Standards)[https://github.com/Jam3/standards/blob/master/GIT_STANDARD.md] follow the link.

We included a default `.gitignore` ordered by topic, please follow the addition rules to keep it consistent.

You will find the Git LFS configuration in `.gitattribute`, currently we are tracking only the files inside:
* src/assets/sounds
* src/assets/videos

Before add your files to Git LFS have in mind a couple options:
1. Evaluate host those files outside of the repository, could be a CDN
2. In case you want to trick the cache and add a hash for those files use them inside specific components instead of the public folder
