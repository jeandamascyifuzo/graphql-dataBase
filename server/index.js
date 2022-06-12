const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors')

const connectDB = require('./config/db')
const app = express();

const schema = require('./schema/clientSchema');

dotenv.config()

const port = process.env.PORT || 7000

//connect to database

connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}/graphql`)
})