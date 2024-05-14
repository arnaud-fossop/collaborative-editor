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

### About the architecture
#### Communication between components: Websockets instead of HTTP Pull requests
The current implementation uses HTTP requests to connect the frontend to the backend. It is important to note that, if we were to implement the collaborative aspect of that editor, we would need to use websockets so that the backend (more precisely a certain component of the backend) will be able to manage the synchronization between users accessing the same edition session.

The usage of this two-way communication could also be useful to send progressive update of the running code in case it is running for a longer period.

The trade-off of this approach will be to have to manage the state of the session that is not needed
in the current approach.

#### Isolation of the running code
As mentionned above, currently the user code is executed in the same environment as the main backend service. This clearly posed an important issue with security (that I tried to manage by using a non-root user in the production Docker image). The optimal implementation would be to launch the user code as a job on a separate worker with restricted access to internal resources. This option could also provide a way to provision differently the infrastructure for main backend API and of the workers (accounting for the popularity of a language, the subscription of the users, etc.).

From my experience, I would use a tool like `Celery` which is implemented for different languages, including [Javascript](https://www.npmjs.com/package/celery-node).

#### Authentication and security
The current authentication is completely void. In a production-grade service, we will have to implement real authentication, provide a token, save the token in a place allowing the user to not need to authenticate again if the page is refreshed.
Also the token should be used in all the following calls to the API, I did not do that yet since there will be no validation for now.

It is worth noting that a different service can be used to manage the authentication, and generate a JWT token that will be used to communicate with the main backend. This will implement a proper separation of concerns.

The backend needs to be configured to allow only connection from the frontend.

#### Frontend design
As you would see, it is not the most beautiful layout, but I hope the main components are there. I did not added the way to give some input arguments, considering that the user may just define them in the script. However, I think, providing a way to define environment variables could be interesting... Anyway, designing UI is not my strong suite, but putting the components together is okay...ish :).

### About the CI/CD
I did not create any CI/CD process, but this would definitely be needed. I did not even used `eslint` (Sorry). But I added some unit tests in the backend code.

