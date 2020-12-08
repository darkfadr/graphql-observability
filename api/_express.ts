require('dotenv').config()
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import graphql from '../core/apollo';

const app = express();
const server = new ApolloServer(graphql);

server.applyMiddleware({ app, path: '/graphql' });
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);