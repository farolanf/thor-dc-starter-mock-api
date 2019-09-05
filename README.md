# Thor DC Starter Mock API

## Requirements

- Node 10+

## Setup

`npm install`

## Run the Server

`npm start`

## Commands

- `npm start` : run the server
- `npm run dev` : run the server in watch mode
- `npm run lint` : run lint
- `npm run lint:fix` : fix lint issues
- `npm test` : run tests
- `npm run test:watch` : run tests in watch mode
- `npm run test:output` : run tests with debug output
- `npm run coverage` : run tests with code coverage

## Postman

Postman environment and collection files are in the `postman` dir, import them in postman to test endpoints.

**Important**

Run the request 'Login/Login success' first before any other requests to get token needed for authentication. And refresh the token with request 'Token/Refresh token success' before it expired (1h), or just run the request 'Login/Login success' again.