var express =  require('express');
var apolloExpress = require('apollo-server').apolloExpress;
var graphiqlExpress = require('apollo-server').graphiqlExpress;
//var cors = require('cors');
var bodyParser = require('body-parser');
var Schema = require('./Schema/schema');
var Resolvers = require('./Resolver/resolver');
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

var port = process.env.port || 8090;
const app = express();
app.use(bodyParser.json());
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,  
});
app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {},
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(port, () => console.log(
    `GraphQL server is running on http://localhost:${port}`
));