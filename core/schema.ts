import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: ID!
    firstname: String
    lastname: String
    email: String
  }

  type Email {
    body: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    login(email: String!): String
    render(mjml: String!): Email
  }
`;
