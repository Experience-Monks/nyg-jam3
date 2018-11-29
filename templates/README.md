# [Prj name]

[Project brief description]

* [Technical Information](#technical-information)
* [Jam3 Generator](#jam3-generator)
* [Getting Started](#getting-started)
* [Running the tests](#running-the-tests)
* [Environments](#environments)
* [Deployment](#deployment)
* [Accounts](#accounts)
* [Contributing](#contributing)
* [Versioning](#versioning)
* [Authors](#authors)
* [License](#license)

## Technical Information

[Technical brief description]

[Technical stack]

[Important links, documentation]

## Jam3 Generator

This application was created using the [Jam3 Generator](https://github.com/Jam3/generator-jam3-v2). To checkout the out
of the box features read our [Developer guide](docs/DEVELOPER_GUIDE.md)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

#### Frontend

Make sure you are in the root folder of the repository and execute `$ npm install`.

#### Backend

[If you are using a backend describe how to set it up locally]

### Running

Make sure you are in the root folder of the repository and execute `$ npm start`.

## Running the tests

The test runs automatically in the Continue Integration server, in order to execute them locally you can use:

1.  `$ npm test`, it will execute the unit tests with jest and will keep watching
2.  `$ npm run storybook` to test the individual components

## Environments

* Development : [https://dev-prj.jam3.net](https://dev-prj.jam3.net)
* Staging : [https://staging-prj.jam3.net](https://staging-prj.jam3.net)
* Release (UAT) : [https://uat-prj.jam3.net](https://uat-prj.jam3.net)
* Initial Production : [https://prj.jam3.net](https://prj.jam3.net)
* Production : [https://domain.com](https://domain.com)

## Deployment

The project has integrated a CI that tracks the deployment branches, below are the tracked branches.

#### Development environment

Merging in to the `develop` branch will trigger a deploy to the Development environment.

Review the link in: #environments

#### Staging environment

Merging in to the `staging` branch will trigger a deploy to the Staging/QA environment.

Review the link in: #environments

#### Production environment

Merging in to the `master` branch will trigger a deploy to the Production environment.

Review the link in: #environments

## Accounts

To be fully engaged in this project you will need access to the accounts and information below, please feel free to ask for access from the _Lead
Developer_, _Producer_ or _Technical Director_

* Google Tag Manager
* Google Analytics
* Dev Password
* Staging Password
* Release Password
* Production Password
* Codeship
* Jira
* Slack Channel #prj-[prj-name]
* Slack Channel for development topics #prj-[prj-name]-dev
* Slack Channel for notifications #prj-[prj-name]-i
* Github access for the project

## Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting
pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the tags on this repository.

## Authors

* **[LD name]** - _Lead Developer_ - @[Github nickname] - [Email]
* **[Dev name]** - _Frontend Developer_ - @[Github nickname] - [Email]

## License

This project is privately owned by Jam3
