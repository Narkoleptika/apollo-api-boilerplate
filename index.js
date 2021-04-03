require('dotenv').config()
const express = require('express')
const http = require('http')
const helmet = require('helmet')
const {ApolloServer} = require('apollo-server-express')
const {typeDefs, resolvers} = require('./schema')
const createDataLoaders = require('./dataloaders')

const {
    NODE_ENV,
    PORT = 3000
} = process.env

const isProd = NODE_ENV === 'production'

const app = express()

app.enable('trust proxy', 'loopback')

const defaultCSP = helmet.contentSecurityPolicy.getDefaultDirectives()
const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            ...defaultCSP,
            // Add GraphQl Playground CSP overrides in dev
            ...(isProd ? {} : {
                'script-src': [
                    ...defaultCSP['script-src'],
                    // GraphQL Playground inline script
                    "'sha256-jy0ROHCLlkmrjNmmholpRXAJgTmhuirtXREXGa8VmVU='",
                    'cdn.jsdelivr.net'
                ],
                'img-src': [
                    ...defaultCSP['img-src'],
                    'cdn.jsdelivr.net'
                ]
            })
        }
    }
}

const helmetHsts = helmet(helmetOptions)
const helmetNoHsts = helmet({...helmetOptions, hsts: false})

app.use((req, res, next) => {
    if (isProd && req.secure) {
        return helmetHsts(req, res, next)
    }

    return helmetNoHsts(req, res, next)
})


const api = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        dataLoaders: createDataLoaders()
    })
})

api.applyMiddleware({app})

const httpServer = http.createServer(app)

api.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
