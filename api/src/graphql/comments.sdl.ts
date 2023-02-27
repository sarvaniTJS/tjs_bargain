export const schema = gql`
  type Comment {
    id: Int!
    comment: String!
    active: Boolean!
    bargain: Bargain!
    bargainId: Int!
    userId: Int!
    user: User!
    parentCommentId: Int
    parentComment: Comment
    childComments: [Comment]
    createdAt: DateTime!
  }

  type Query {
    comments(bargainId: Int!): [Comment!]! @skipAuth
    childComments(parentCommentId: Int!): [Comment!]! @skipAuth
    comment(id: Int!): Comment @skipAuth
  }

  input CreateCommentInput {
    comment: String!
    active: Boolean!
    bargainId: Int!
    externalId: String!
    parentCommentId: Int
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
