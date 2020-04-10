require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const restEndpoints = require('./rest/routes');
const authHandler = require('./authHandler-service');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

mongoose.connect(
  `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds026898.mlab.com:26898/disnetjygraph`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
const app = express();
app.use(cors());
app.use(`/public`, express.static(path.join(__dirname, './public')));
app.use('/v1', restEndpoints);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async ({ req }) => {
      const userToken = await authHandler(req);
      return { userToken };
    },
  });
  server.applyMiddleware({ app });
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
