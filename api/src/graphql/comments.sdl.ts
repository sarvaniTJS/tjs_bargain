export const schema = gql`
  type Comment {
    id: Int!
    comment: String!
    active: Boolean!
    bargain: Bargain!
    bargainId: Int!
    userId: Int!
    user: User!
    createdAt: DateTime!
  }

  type Query {
    comments(bargainId: Int!): [Comment!]! @requireAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    comment: String!
    active: Boolean!
    bargainId: Int!
    externalId: String!
  }

  input UpdateCommentInput {
    comment: String
    active: Boolean
    bargainId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
