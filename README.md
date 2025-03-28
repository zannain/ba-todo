# BA Todo

BA Todo is a full-stack Todo application that includes a backend API and a frontend user interface.

## Running with Docker

1. Install [Docker](https://www.docker.com/get-started) and Docker Compose
2. Clone this repository
3. Run `docker-compose up -d` in the root directory. The `-d` flag will spin up the application and run it in the background.
4. Access the app at http://localhost:3000
5. If you want to generate test data, run `docker-compose run backend npm run seed`

You can verify that the backend is running correctly by visiting http://localhost:5001/health in your browser.

## Stopping the Application

To properly stop the application:

1. If you started the app with `docker-compose up` (without the `-d` flag), press `Ctrl+C` in the terminal where it's running.
2. If you started in detached mode with `docker-compose up -d`, run: `docker-compose down`
3. To stop the services and also remove all data volumes (this will delete your database data): `docker-compose down -v`