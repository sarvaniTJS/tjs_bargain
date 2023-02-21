export const schema = gql`
  type Vote {
    id: Int!
    vote: VoteType!
    active: Boolean!
    bargain: Bargain!
    bargainId: Int!
    userId: Int!
    user: User!
    createdAt: DateTime!
  }

  enum VoteType {
    UPVOTE
    DOWNVOTE
  }

  type Query {
    votes: [Vote!]! @requireAuth
    vote(id: Int!): Vote @requireAuth
  }

  input CreateVoteInput {
    vote: VoteType!
    active: Boolean!
    bargainId: Int!
    externalId: String
  }

  input UpdateVoteInput {
    vote: VoteType
    active: Boolean
    bargainId: Int
  }

  type Mutation {
    createVote(input: CreateVoteInput!): Vote! @requireAuth
    updateVote(id: Int!, input: UpdateVoteInput!): Vote! @requireAuth
    deleteVote(id: Int!): Vote! @requireAuth
  }
`
