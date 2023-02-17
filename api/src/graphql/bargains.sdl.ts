export const schema = gql`
  type Bargain {
    id: Int!
    product: String!
    description: String!
    active: Boolean!
    votes: [Vote]!
    comments: [Comment]!
    createdAt: DateTime!
  }

  type Query {
    bargains: [Bargain!]! @requireAuth
    bargain(id: Int!): Bargain @requireAuth
  }

  input CreateBargainInput {
    product: String!
    description: String!
    active: Boolean!
  }

  input UpdateBargainInput {
    product: String
    description: String
    active: Boolean
  }

  type Mutation {
    createBargain(input: CreateBargainInput!): Bargain! @requireAuth
    updateBargain(id: Int!, input: UpdateBargainInput!): Bargain! @requireAuth
    deleteBargain(id: Int!): Bargain! @requireAuth
  }
`
