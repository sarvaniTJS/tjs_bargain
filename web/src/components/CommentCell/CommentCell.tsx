import type { FindCommentQuery, FindCommentQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCommentQuery($bargainId: Int!) {
    comments: comments(bargainId: $bargainId) {
      id
      comment
      user {
        userName
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

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
        <div>
          <h5>{comment.user.userName}</h5>
          <p>{comment.comment}</p>
        </div>
      ))}
    </>
  )
}
