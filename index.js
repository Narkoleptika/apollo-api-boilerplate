(async() => {
    try {
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

        app.use(helmet({
            hsts: {
                setIf(req) {
                    return isProd && req.secure
                }
            }
        }))

        const api = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({
                dataLoaders: createDataLoaders()
            }),
            playground: {
                settings: {
                    'editor.cursorShape': 'line'
                }
            }
        })

        api.applyMiddleware({app})

        const httpServer = http.createServer(app)

        api.installSubscriptionHandlers(httpServer)

        httpServer.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
})()
