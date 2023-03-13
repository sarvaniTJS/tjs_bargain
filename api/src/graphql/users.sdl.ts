export const schema = gql`
  type User {
    id: Int!
    externalId: String!
    email: String!
    picture: String
    userName: String!
    active: Boolean
    roles: String!
    createdAt: DateTime!
  }

  type Query {
    users(userName: String): [User!]! @skipAuth
    user(externalId: String): User! @requireAuth
  }

  input UpdateUserInput {
    picture: String
    active: Boolean
    roles: String
  }

  type Mutation {
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
  }
`
