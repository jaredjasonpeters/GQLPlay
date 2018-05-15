const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://jaredjpeters:Nolan0309@ds123770.mlab.com:23770/gql-ninja');
mongoose.connection.once('open', () => console.log('connected to db'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => console.log('listening on 4000'));
