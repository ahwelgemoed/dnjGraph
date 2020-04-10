const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    id: ID
    fireBaseId: ID
    name: String
    isAdmin: Boolean
    bookmarks: [String]
    isNew: Boolean
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
  type BookmarkAddedResponse {
    success: Boolean!
    message: String
    poem: Poem
  }
  type AllActiveImages {
    imageName: String
    url: String
  }

  input PoemInput {
    title: String
    bodyText: String
    photoURL: String
    isDraft: Boolean
    handle: String
    date: String
    user: ID
    id: ID
  }
  type Query {
    poems(limit: Int, page: Int): PoemsResults
    myDraftPoems: PoemsResults
    allActiveImages: AllActiveImages
    myPoems: PoemsResults
    allUsersBookmarks(user: ID): PoemsResults
    poem(id: ID): Poem
    User(id: ID): User
  }
  type Mutation {
    addPoem(poem: PoemInput): PoemUpdateResponse
    addUser(user: UserInput): UserUpdateResponse
    addBookmark(user: ID, poem: ID): BookmarkAddedResponse
  }
`;

module.exports = typeDefs;
