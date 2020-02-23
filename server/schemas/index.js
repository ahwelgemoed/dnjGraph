const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    id: ID
    fireBaseId: ID
    name: String
    isAdmin: Boolean
  }
  type Poem {
    id: ID
    title: String
    bodyText: String
    photoURL: String
    handle: String
    isDraft: Boolean
    user: User
    date: String
    isOld: Boolean
  }
  type PoemsResults {
    poems: [Poem]
    totalDocs: Int
  }
  input UserInput {
    name: String
    fireBaseId: ID
    isAdmin: Boolean
  }
  type PoemUpdateResponse {
    success: Boolean!
    message: String
    poem: Poem
  }
  type UserUpdateResponse {
    success: Boolean!
    message: String
    user: User
  }

  input PoemInput {
    title: String
    bodyText: String
    photoURL: String
    isDraft: Boolean
    handle: String
    date: String
    user: ID
  }
  type Query {
    poems(limit: Int, page: Int): PoemsResults
    poem(id: ID): Poem
    User(id: ID): User
  }
  type Mutation {
    addPoem(poem: PoemInput): PoemUpdateResponse
    addUser(user: UserInput): UserUpdateResponse
  }
`;

module.exports = typeDefs;
