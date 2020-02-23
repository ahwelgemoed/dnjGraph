const express = require('express');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const restEndpoints = require('./rest/routes');
const authHandler = require('./authHandler-service');

const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

mongoose.connect(
  'mongodb://ahwelgemoed:KoosKombuis..09@ds026898.mlab.com:26898/disnetjygraph',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
const app = express();

app.use(`/public`, express.static(path.join(__dirname, './public')));
app.use('/v1', restEndpoints);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const userToken = authHandler(req);
      return { userToken };
    }
  });
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
