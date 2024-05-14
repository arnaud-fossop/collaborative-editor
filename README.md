# Collaborative Editor

This project aims at implementing an online tool similar to sharepad.io. The user will be able to collaborate editing code in Javascript and Python.

This initial version does not allow collaboration yet.

## Repo Organization
This repo contains folders for each component of the application. The current ones are:

### Frontend: folder [`frontend`](./frontend/)
As the name suggests it, it contains the code of the ReactJS app used as frontend. At the moment, the user is directed to a login page for the sake of the exercice (since any credentials are accepted). After the user logged in, they are redirected to the main page where they can edit code and run them. Currently, two languages are considered: Python and Javascript.

### Backend: folder  [`backend`](./backend/)
Similar to the previous, the folder contains the code of a NodeJS backend that executes the code provided by the user.

Currently the backend is executing the code directly in the same space, but it is definitely not a good practice since the user code would have access to the same resources as the backend.
The next step would be to execute the user code in a sandboxed environment.

## Running the code

### Using Docker Compose
The components can be deployed using the [`docker-compose.yml`](./docker-compose.yml) file provided. This requires that a recent version of `docker` is installed. To run the code, open a terminal at the root of the repository and execute:

```shell
docker compose up -d
```

Then connect to http://localhost:3000 to have access to the frontend. On the login page, when asked for user name and password, provide any values like `admin` for user and `adminpwd` for password.

### Running without Docker
To run without Docker:
1. Open a terminal at the root of the repository  and execute:
```shell
cd frontend
npm ci
npm start
```
This will deploy the frontend and make it available at http://localhost:3000
2. Open another terminal at the root of the repository and execute:
```shell
cd backend
npm ci
PORT=8000 npm run dev
```
This will deploy the backend on your local computer at the port 8000.

## General comments
