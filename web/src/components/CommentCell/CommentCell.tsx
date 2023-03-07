import type { FindCommentQuery, FindCommentQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Comment from '../Comment/Comment'

export const QUERY = gql`
  query FindCommentQuery($parentCommentId: Int!) {
    comments: childComments(parentCommentId: $parentCommentId) {
      id
      createdAt
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
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
      <div className="bg-white">
        <div>
          <h2 className="sr-only">Customer Reviews</h2>

          <div>
            {comments.map((comment, reviewIdx) => (
              <Comment
                key={comment.id}
                comment={comment}
                bargainId={comment.bargain}
                reviewIdx={reviewIdx}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
