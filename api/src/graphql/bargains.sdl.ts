export const schema = gql`
  type Bargain {
    id: Int!
    product: String!
    description: String!
    active: Boolean!
    votes: [Vote]!
    upvoteCount: Int!
    downvoteCount: Int!
    comments: [Comment]!
    userId: Int!
    user: User!
    createdAt: DateTime!
  }

  type Query {
    bargains: [Bargain!]! @skipAuth
    bargain(id: Int!): Bargain @skipAuth
  }

  input CreateBargainInput {
    product: String!
    description: String!
    active: Boolean!
    externalId: String!
  }

  input UpdateBargainInput {
    product: String
    description: String
    active: Boolean
    upvoteCount: Int
    downvoteCount: Int
  }

  type Mutation {
    createBargain(input: CreateBargainInput!): Bargain! @requireAuth
    updateBargain(id: Int!, input: UpdateBargainInput!): Bargain! @requireAuth
    deleteBargain(id: Int!): Bargain! @requireAuth
  }
`
