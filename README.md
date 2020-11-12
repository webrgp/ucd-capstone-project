# PhotoWall - Udacity Cloud Developer Capstone Project

Serverless picture organizer application where a user can manage pictures and captions.

![screen capture](docs/screen-grab.gif)


## Functionality

- The application allows users to create, update, delete picture items.
- The application allows users to upload a picture.
- The application only displays pictures for a logged in user.
- A user needs to authenticate in order to use an application (Auth0)

## Codebase

- The code is split into multiple layers separating business logic from I/O related code.
- Code is implemented using async/await and Promises without using callbacks.

## Best Pratices

- All resources in the application are defined in the `serverless.yml` file.
- Each function has its own set of permissions.
- Application has sufficient monitoring.
- HTTP requests are validated.

## Architecture

- Data is stored in a table with a composite key.
```
KeySchema:
      - AttributeName: partitionKey
        KeyType: HASH
      - AttributeName: sortKey
        KeyType: RANGE
```
- items are fetched using the `query()` method and not `scan()` method (which is less efficient on large datasets)

# How to run the application

## Backend

The backend is already deployed to Amazon Web Services. You can directly run the client.
But if you want to deploy your own, you can run the code below.

```
cd backend
npm install
sls deploy -v
```

## Client

The application UI is built using [GatsbyJS](https://www.gatsbyjs.com). To start the client application run the following commands:

```
cd client
npm install
npm run start
```