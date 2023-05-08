import { gql } from 'apollo-server-express';

const User = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    zipCode: String
    email: String
    password: String
    emailConfirmed: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type RegAuth {
    token: ID
  }

  type Query {
    me: User
    user(email: String!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, zipCode: String!, email: String!, password: String!): Auth!
    accountReg(token: String!) : RegAuth
    forgotPass(email: String!): User
    resetPass(token: String!, password: String!) : RegAuth
    login(email: String!, password: String!): Auth
  }
`;

export default User;
