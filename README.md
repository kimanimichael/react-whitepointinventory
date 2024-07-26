# White Point Inventory App
White Point inventory is an inventory app for management of supplier transactions for White Point limited company. This aims to solve inventory management problems while also provide insights from data collected from previous transactions.

## Prerequisites
The following are required to run this application:

1. [Docker](https://docs.docker.com/get-docker/) (version 26.0.0)

To develop whitepointinventory, you will need:

1. [node](https://nodejs.org/en/download/package-manager) (version 20.14.0)
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (version 10.7.0)

## Installation
Ensure all  pre-requisites are satisfied before carrying out installation and clone the repo

### Using Docker
Execute this command from the project root:

```shell
docker compose -f docker/docker-compose.yml up
```

### Without Using Docker
From the project root:
```shell
npm start
```

