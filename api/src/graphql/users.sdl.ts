export const schema = gql`
  type User {
    id: Int!
    externalId: String!
    email: String!
    picture: String
    userName: String!
    active: Boolean
    role: String!
    createdAt: DateTime!
  }

  type Query {
    users: [User!]! @skipAuth
  }

  input UpdateUserInput {
    picture: String
    active: Boolean
  }

  type Mutation {
    updateUser(id: Int!, input: UpdateCommentInput!): User! @requireAuth
  }
`
