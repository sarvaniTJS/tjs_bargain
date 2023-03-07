import { Fragment } from 'react'

import { CalendarIcon } from '@heroicons/react/20/solid'
import type {
  FindShowBargainQuery,
  FindShowBargainQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'
import VoteForm from '../VoteForm/VoteForm'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const QUERY = gql`
  query FindShowBargainQuery($id: Int!) {
    showBargain: bargain(id: $id) {
      id
      product
      description
      upvoteCount
      downvoteCount
      user {
        userName
        createdAt
      }
      comments {
        id
        comment
        parentCommentId
        parentComment {
          id
          comment
        }
        childComments {
          id
        }
        user {
          userName
          externalId
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
      <div className="lg:flex lg:items-center lg:justify-between">
        <img
          className="h-12 w-12 rounded-full mr-3"
          src="https://s.gravatar.com/avatar/422d7242d6a1a55e64842f4be6c05c0b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fus.png"
          alt=""
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {showBargain.product}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-1 flex items-center text-sm text-gray-500">
              by {showBargain.user.userName}
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {showBargain.user.createdAt}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-l text-gray-700 leading-8">
        {showBargain.description}
      </p>

      {isAuthenticated && (
        <div className="mt-6">
          <VoteForm
            bargainId={showBargain.id}
            upvotes={showBargain.upvoteCount}
            downvotes={showBargain.downvoteCount}
          />
        </div>
      )}
      <div className="mt-6">
        {isAuthenticated && (
          <CommentForm bargainId={showBargain.id} parentCommentId={null} />
        )}
      </div>

      <div className="mt-6">
        {showBargain.comments.map((comment) => {
          if (comment.parentCommentId === null) {
            return (
              <div key={comment.id}>
                <Comment comment={comment} bargainId={showBargain} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
