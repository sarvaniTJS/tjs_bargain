import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindCommentQuery } from 'src/components/CommentCell'
import { QUERY as FindShowBargainQuery } from 'src/components/ShowBargainCell'
import { isAuthenticated } from 'src/lib/auth'

import CommentCell from '../CommentCell/CommentCell'
import CommentForm from '../CommentForm/CommentForm'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Comment = ({ comment, bargainId, reviewIdx }) => {
  const [showForm, setShowForm] = useState(false)
  const [showChildComments, setShowChildComments] = useState(false)
  const { userMetadata, isAuthenticated } = useAuth()
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Comment deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: FindShowBargainQuery, variables: { id: bargainId.id } },
      {
        query: FindCommentQuery,
        variables: { parentCommentId: comment.parentCommentId },
      },
    ],
  })
  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bargain?')) {
      deleteComment({ variables: { id } })
    }
  }
  const openCommentForm = () => {
    setShowForm(comment.id)
    setShowChildComments(false)
  }
  const openReplies = () => {
    setShowChildComments(comment.id)
    setShowForm(false)
  }
  return (
    <>
      <Toaster />
      <div className="flex space-x-4 text-sm text-gray-500">
        <div className="flex-none py-5">
          <img
            src={comment.user.picture}
            alt=""
            className="h-10 w-10 rounded-full bg-gray-100"
          />
        </div>
        <div
          className={classNames(
            reviewIdx === 0 ? '' : 'border-t border-gray-200',
            'flex-1 py-5'
          )}
        >
          <h3 className="font-medium text-gray-900">{comment.user.userName}</h3>
          {/* <p>
                    <time dateTime={review.datetime}>{review.date}</time>
                  </p> */}
          <div className="prose prose-sm mt-4 max-w-none text-gray-500">
            {comment.comment}
          </div>

          <div className="mt-6">
            {isAuthenticated && (
              <button className="pr-3" onClick={openCommentForm}>
                Comment
              </button>
            )}
            <button className="pr-3" onClick={openReplies}>
              view replies
            </button>
            {isAuthenticated &&
              comment.user.externalId === userMetadata.sub && (
                <button
                  className="px-3"
                  onClick={() => onDeleteClick(comment.id)}
                >
                  Delete
                </button>
              )}
          </div>
          <div />
          {showForm === comment.id && (
            <>
              <div className="mt-6">
                <CommentForm
                  bargainId={bargainId.id}
                  parentCommentId={comment.id}
                />
              </div>
              <div className="mt-4">
                <CommentCell parentCommentId={comment.id} />
              </div>
            </>
          )}
          <div className="mt-6">
            {showChildComments === comment.id && (
              <CommentCell parentCommentId={comment.id} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment
