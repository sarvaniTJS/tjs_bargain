import type { FindCommentQuery, FindCommentQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Comment from '../Comment/Comment'

export const QUERY = gql`
  query FindCommentQuery($parentCommentId: Int!) {
    comments: childComments(parentCommentId: $parentCommentId) {
      id
      comment
      bargain {
        id
      }
      parentCommentId
      user {
        userName
        externalId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No replies to display</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCommentQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  comments,
}: CellSuccessProps<FindCommentQuery, FindCommentQueryVariables>) => {
  return (
    <>
      {comments.map((comment) => (
        <ul key={comment.id}>
          <li>
            <Comment comment={comment} bargainId={comment.bargain} />
          </li>
        </ul>
      ))}
    </>
  )
}
