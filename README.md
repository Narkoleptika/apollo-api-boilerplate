# Apollo API Boilerplate

This is a boilerplate for an Apollo GraphQL API server with Sequelize and Express.

1. [Features](#features)
2. [Getting Started](#getting-started)

## [Features](#features)
* Apollo - GraphQL - The other other API paradigm
* DataLoader - Batch and deduplicate DB queries / requests
* Sequelize - ORM for (Postgres or MySQL)
* Sequelize CLI - Easily manage and scaffold models, migrations and seeders from the command line
* ESLint - Because consistency is cool
* dotenv - Load your environment variables from `.env`
* Glob - automatically load models, dataloaders and GraphQL schema types/resolvers

## [Getting Started](#getting-started)

```shell
git clone https://github.com/Narkoleptika/apollo-api-boilerplate.git
cd apollo-api-boilerplate
yarn
touch .env
```

Inside of `.env`
```dosini
NODE_ENV=development
PORT=3000

DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=database
DB_HOST=localhost
DB_DIALECT=postgres
DB_LOGGING=true
```

If you're going with Postgres, then you're good, keep going. Otherwise, if you want to use a different database, run `yarn remove pg pg-hstore` and install whichever one of [these](http://docs.sequelizejs.com/manual/installation/getting-started.html) packages for the db you want to use.

```shell
yarn seq db:create
yarn seq db:migrate
yarn seq db:seed:all
yarn dev
```

Go to `http://localhost:3000/graphql` and you should see GraphQL Playground, ready to go.

---

**Feedback and contributions welcome**
