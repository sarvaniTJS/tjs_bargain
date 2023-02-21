export const schema = gql`
  type User {
    id: Int!
    externalId: String!
    email: String!
    picture: String
    userName: String!
    createdAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
  }

  input UpdateUserInput {
    userName: String
  }
`
