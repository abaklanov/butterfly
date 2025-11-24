# Butterfly critique

## How to start up
For the initial build
```
docker compose up --build
```

or
```
docker compose build --no-cache
docker compose up
```

Afterwards it's enough to go with 
```
docker compose up
```

API should be available at
http://localhost:3000

Swagger is at
http://localhost:3000/documentation#/

Tests can be run on host machine 
```
npm i
npm run build
npx prisma generate
npm run test
```

## The main goal 
As per assignment, I made sure the application is extendable and scalable, hence the changes made to both the structure of the code and the choice of the stack and supplimentary tools. Decisions are made as per this project is going to live longer and grow into something big, that's why we need scalability.  

Every single decision making about technology selected should be treated differently if this project was something else, e.g. if I was not the only one to make those decisions. In this case among other we have to consider team's current knowledge and learning curves of potential new techs, limitations of the environment the service is going to be run, stage of the project. 

Since the app is quite small at the time I took the liberty of changing quite a lot. Basically rewriting it from scratch.

## ESM vs CommonJS
While the original assingment example had only CommonJs, I decided to go with ESM support only. This is not going to be a published library, which might lead to compatibility issues when used by wide audience. On the contrary, it's supposed to be a web service. In this case we can use modern features of ESM.

## Typescript
Initial setup was with JS, and it might make sense in Node.js environment, as well as my previous remark on CommonJs modules. However I still prefer to hop over some initial painful steps of configuring everything in a project, but then have a static typing check. I believe it still speeds up the process of a development of a reliable code. 

## Versions
Initial project had some quite outdated libraries. That needed to be changed in order to make sure the security of the app is improved. Later versions tend to have less vulnarabilities

## Node version
There was version 18 mentioned in the assignment, but I went with v22. I was told it does not play a significant role specifically for the test. Considering all that, aiming for the later versions again allows for better security, availability of up-to-date libraries and functionality of Node itself.

## Boilerplate
At this point I figured that the example app is way far away from what I want to use and what I feel the result service should look like. So I went for a boilerplate to speed up the process. This one had everything that I needed and configured (TS, ESM, Node 22 support, eslint, vitest): https://github.com/jsynowiec/node-typescript-boilerplate

## DDD
I noticed that initially, the API was implemented in one main file. That should be changed. I believe breaking the app down into domains is a better approach here. People instinctively understand what are those entities and where to look for their components. So, for instance, everything related to butterfly entity is collected in one folder, namely "src/butterflies"

## Model Route Controller
Stemming from MVC approach, while not having views, this should work quite nicely and intuitively. The API should have a layer of database commnunication and thin controllers. It all glued together with the routes fed to the framework. 

The main idea behind it is separation of concern. It allows for better code readability, it's less prone to errors when some parts are changed, leaving others intact.

## Fastify vs Express
This has been tweaked as well. While express was introduced initially, I found Fastify a better option, not only because of its speed, but plugin system and ability to separate concerns and use it somewhat as DI container, should warrant a better extendability of the service. 

## Database engine and ORM
While lowdb initially was set in the example, I find this as not well sustainable solution. JSON-based approach might quickly get laggy when the database grows in size. With multiple users online, problems with consistency of the db might arise. 

On top of that, we we talk about users rating butterflies, I immediately think about relations. Without knowing what to expect from the db structure in the future, read "we need extensibility", I believe the better approach is to go with relation db. Specifically postgreSQL here. With MVCC, this should help with heavy write/read traffic.

When dealing with the db, I prefer to use ORM. I view it as a more safe and still flexible solution. We get basic protection from e.g. sql injections (whille of course need to keep an eye on custom queries). We get basic operations along with it, while we still can write pure sql for something complex. Here I went with Prisma ORM.

The choice of the tool also dictated by the necessity of having migrations, which Prisma provides support for. Migrations will help with the consistency of the db across environments and helps the team to be on the same page every time there's a change to the db structure.

## Database structure
There are two tables, naturally serving for the basic entities in the service: butterflies and users. The third, Ratings is just a table referencing both of them and keeping a rating. The rating table has foreign keys and constraints. This is done for db consistency and cascading style of relation allows for easy entries management.

DB model is described according to Prisma's approach in /prisma/schema.prisma

As a highlight, Ratings table has a unique constraint which leads to a certain way of dealing with it through ORM. Prisma allows for upsert() method that decided whether to update or create an entry depending on its existance in the database. Here it nicely integrates with the idea of users rating the butterflies and then changing their minds and correcting the amoiunt of stars they left after some time.

Speaking of constraints. This is one of the reasons why I decided to go with a test db instead of mocking. A working db might help testing its functionalities like keys violations, which might be close to impossible with just mocking.

## Testing
I pay specific attention to integration testing. Both in backend and frontend. So the tests here contain primalrily integration tests of the api endpoints. How they response in different use cases.

## API endpoints verbs and URL format
GET and POST verbs are used for fetching the data and creating new objects in the db accordingly. API URL convention is /resource/id/sub-collection. E.g. /users/123abc/ratings

## Testing runner choice

Vitest and esm based projects are friends. It works flawlessly with less configuration, faster as it handles tests in parallel and it mimics jest's syntax, so it's not that alien to somebody in the team who's not familiar with it.

A bonus is that it has GUI, which helps to visualise testing process.

## Container
For better team work, better environment management and further cloud integration, containerization is important. I put everything into a docker container, which will allow to easily set everything up on other systems.

When firing up the container, it will set up a server and two databases: one live and another for testing purposes.

## Security
API security is provided by Helmet library, which adds necessary headers automatically to ensure protection from some attacks on the API. However it's not full protection and some other steps ought to be taken. Like authorization and using bearer tokens for requests.

## Swagger
A quick addition for better DX. Swagger and maybe even better to have Scalar UI, will help out with further development, e.g. the frontend side of the project.

## Eslint and prettier
I pay attention to code appearance. It hsould be well structured, minimally commented and look neat. Prettier helps with initial clean up and formatting. Eslint is always used and helps to make sure we are on the same page with the team in terms of code practices

## Potential improvements further

Of course, this service can grow way further. I can think of several potential improvements that I have not yet able to introduce here, but would like to point out

- Cloud implementation. I strongly believe employing infrastructure from cloud affects positively on the development and maintanence. This should be done.
- GraphQL
With cloud integration, and depending on the data structure, the latter can come from various sources. GraphQL might help out with easying out the process of gathering data in the frontend side. However the app might not get too complicated to switch.
- Authentication/Authorization
API with no authentication is prone for attacks or simple abuse. This is probably do with some cloud authenticator and bearer tokens.
- Caching might help with frequent requests
- Configuration validation. .env files can be asserted against schema for better reliability
- Frontend part of the service can be made with React and Tanstack. The latter I'd use for Router and Query: set up frontend routing and sync backend and frontend data.
- frontend and backend DTOs/models can be syncronised through OpenAPI models with tools like Orval. This will make life easier for teams consistig of backend and forntend developers, or just to make sure be and fe has the same type safe DTOs when dealing with the same API but from different sides.
