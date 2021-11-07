# EpiJavascript - back

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Running the app](#running-the-app)
  * [Environment variable](#environment-variable)
* [Deployment](#deployment)
* [License](#license)
* [Contact](#contact)

## About The Project

Recreation of a discord web application.

Front of the [back](https://github.com/EpiJavascript/back) project.

### Built With

* [React.js](https://fr.reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

* [Node](https://nodejs.org/) v.14.17.5 (lts/fermium)
* [Npm](https://www.npmjs.com/) according to the _Node_ version

### Installation

```sh
npm i
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run build
```

### Environment variable

The app loads a dotenv file depending on your NODE_ENV environment variable (fallback to _development_) : `.env.$NODE_ENV`.

## Deployment

This project is link with multiple [Heroku](https://www.heroku.com) applications, pushing to some branches will trigger an auto-deployment :
* dev -> https://dashboard.heroku.com/apps/epi-javascript-frontend-dev
* master -> https://dashboard.heroku.com/apps/epi-javascript-frontend-prod


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/EpiJavascript/front](https://github.com/EpiJavascript/front)
