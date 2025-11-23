### Butterfly critique

## The main goal 
As per assignment, I made sure the application is extendable and scalable, hence the changes made to both the structure of the code and the choice of the stack and supplimentary tools. Decisions are made as per this project is going to live longer and grow into something big, that's why we need scalability.  

Every single decision making about technology selected should be treated differently if this project was something else, e.g. if I was not the only one to make those decisions. Since we have to consider team's current knowledge and learning curves of potential new techs, limitations of the environment the service is going to be run, stage of the project. 

Since the app is quite small at the time I took the liverty of changing quite a lot. Basically rewriting it from scratch.

## ESM vs CommonJS
While the original assingment example had only CommonJs, I decided to go with ESM support only. This is not going to be a published library, which might lead to compatibility issues when used by wide audience. On the contrary, it's supposed to be a web service. In this case we can use modern features of ESM.

## Typescript
Initial setup was with JS, and it might make sense in Node.js environment, as well as my previous remark on CommonJs modules. However I still prefer hop over some initial painful steps of configuring everything in a project, but then have a static typing check. I believe it still speeds up the process. 

## Versions
Initial project had some quite outdated libraries. That needed to be improved in order to make sure the security of the app is improved. Later versions tend to have less vulnarabilities

## Node version
There was version 18 mentioned in the assignment, but I went with v22. I was told it does not play a significant role specifically for the test. Considering all that, aiming for the later versions again allows for better security, availability of up-to-date libraries and functionality of Node itself.

## Boilerplate
At this point I figured that the example app is way far away from what I want to use and what I feel the result service should look like. So I went for a boilerplate to speed up the process. This one had everything that I needed and configured (TS, ESM, Node 22 support, eslint, vitest): 

## DDD
I noticed that initially, the API was implemented in one main file. That should be changed. I believe breaking the app down into domains is a better approach here. People instinctively understand what are those entities and where to look for their components. So, for instance, everything related to butterfly entity is collected in one folder, namely "src/butterflies"

## Model Route Controller
Stemming from MVC approach, while not having views, this should work quite nicely and intuitively. The API should have a layer of database commnunication and thin controllers. It all glued together with the routes fed to the framework. 

The main idea behind it is separation of concern. It allows for better code readability, it's less prone to errors when some parts are changed, leaving others intact.

## Fastify vs Express
This has been tweaked as well. While express was introduced initially, I found Fastify a better option, not only because its speed, but plugin system and ability to separate concerns and use it somewhat as DI container, should warrant a better extendability of the service. 

## Database engine and ORM
While lowdb initially was set in the example, I find this as not well sustainable solution. JSON-based approach might quickly get laggy when the database grows in size. With multiple users online, problems with consistency of the db might arise. 

On top of that, we we talk about users rating butterflies, I immediately think about relations. Without knowing what to expect from the db structure in the future, read "we need extensibility", I believe the better approach is to go with relation db. Specifically postgreSQL here. With MVCC, this should help with heavy write/read traffic.

When dealing with the db, I prefer to use ORM. I view it as a more safe and still flexible solution. We get basic protection from e.g. sql injections (whille of course need to keep an eye on custom queries). We get basic operations along with it, while we still can write pure sql for something complex. Here I went with Prisma ORM.

## Database structure

## Testing runner choice

Vitest and esm based projects are friends. It works flawlessly with less configuration, faster as it handles tests in parallel and it mimics jest's syntax, so it's not that alien to somebody in the team who's not familiar with it.

A bonus is that it has GUI, which helps to visualise testing process.

## Container

## Security

## Swagger

## Potential improvements further

Of course, this service can grow way further. I can think of several potential improvements that I have not yet able to introduce here, but would like to point out

- Cloud implementation. I strongly believe employing infrastructure from cloud affects positively on the development and maintanence. This should be done.
- GraphQL
- Authentication/Authorization
