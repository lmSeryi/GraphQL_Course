'use strict'

const { graphql, buildSchema } = require('graphql')

//Schema define
const schema = buildSchema(`
    type Query {
        hello: String
        greeting: String
    }
`)

//Resolver configuration
const resolvers = {
    hello: 'Hello, World!',
    greeting: 'Hola, Everyone!'
}



//Query execute
graphql(schema, '{greeting}', resolvers)
    .then(data => {
        console.log(data)
    })