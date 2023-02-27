import type {
  FindShowBargainQuery,
  FindShowBargainQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'
import VoteForm from '../VoteForm/VoteForm'

export const QUERY = gql`
  query FindShowBargainQuery($id: Int!) {
    showBargain: bargain(id: $id) {
      id
      product
      description
      upvoteCount
      downvoteCount
      comments {
        id
        comment
        parentCommentId
        childComments {
          id
          comment
          parentCommentId
        }
        user {
          userName
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindShowBargainQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  showBargain,
}: CellSuccessProps<FindShowBargainQuery, FindShowBargainQueryVariables>) => {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <h2>{showBargain.product}</h2>
      <p>{showBargain.description}</p>
      {isAuthenticated && <VoteForm bargainId={showBargain.id} />}
      <p>Upvotes: {showBargain.upvoteCount}</p>
      <p>Downvotes: {showBargain.downvoteCount}</p>
      <div>Comments</div>
      {isAuthenticated && (
        <CommentForm bargainId={showBargain.id} parentCommentId={null} />
      )}
      {showBargain.comments.map((comment) => {
        if (comment.parentCommentId === null) {
          return (
            <>

              <Comment comment={comment} bargainId={showBargain} />
            </>
          )
        }
      })}
    </div>
  )
}
