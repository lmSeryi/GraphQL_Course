'use strict'

//Imports
const { buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')

const app = express()
const port = process.env.port || 3000

//Schema define
const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

//Resolver configuration
const resolvers = {
    hello: 'Hello, World!',
}

//Middleware define
app.use('/api', gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
    })
)

//Listening
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
})