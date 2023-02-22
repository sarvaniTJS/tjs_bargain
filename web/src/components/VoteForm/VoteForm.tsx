import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindShowBargainQuery } from 'src/components/ShowBargainCell'

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

  const [createVote, { loading, error }] = useMutation(CREATE, {
    onError: () => {
      toast.error('Something is wrong')
    },
    onCompleted: () => {
      toast.success('vote submitted')
    },
    refetchQueries: [
      { query: FindShowBargainQuery, variables: { id: bargainId.bargainId } },
    ],
  })
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
      <Toaster />
      <button disabled={loading} onClick={upvote}>
        Upvote
      </button>
      <button disabled={loading} onClick={downvote}>
        Downvote
      </button>
    </div>
  )
}

export default VoteForm
