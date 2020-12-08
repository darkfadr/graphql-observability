import { micron, createLambda } from '@yotie/micron';
import { ApolloServer } from 'apollo-server-micro';
import { authn } from '../core/middlewares';
import graphql from '../core/apollo';

const ApolloLambda = micron(({ req, res }) => {
  const server = new ApolloServer(graphql);
  const lambda = server.createHandler({ path: '/api' });
  
  return lambda(req, res);
});

export default createLambda(ApolloLambda, {
  middlewares: [authn],
  cors: {
    origin: process.env.CORS_ORIGIN
  }
});