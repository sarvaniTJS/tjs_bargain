import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const CREATE = gql`
  mutation CreateVoteMutation($input: CreateVoteInput!) {
    createVote(input: $input) {
      id
      createdAt
    }
  }
`
const VoteForm = (bargainId) => {
  const { userMetadata } = useAuth()

  const [createVote, { loading, error }] = useMutation(CREATE)
  const upvote = () => {
    createVote({
      variables: {
        input: {
          bargainId: bargainId.bargainId,
          externalId: userMetadata.sub,
          vote: 'UPVOTE',
          active: true,
        },
      },
    })
  }
  const downvote = () => {
    createVote({
      variables: {
        input: {
          bargainId: bargainId.bargainId,
          externalId: userMetadata.sub,
          vote: 'DOWNVOTE',
          active: true,
        },
      },
    })
  }
  return (
    <div>
      <button onClick={upvote}>Upvote</button>
      <button onClick={downvote}>Downvote</button>
    </div>
  )
}

export default VoteForm
