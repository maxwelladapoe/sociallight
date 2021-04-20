const {ApolloServer} = require('apollo-server');

const mongoose = require('mongoose');
const configs = require('./config.js')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs, resolvers, context:({req}) => ({req})
})

mongoose.connect(configs.MONGODB_CONNECT, {userNewUrlParser: true}).then(() => {
    console.log("Connected to DB")
    server.listen({port: 5000})
}).then(res => {
    console.log(`Server running`)
})