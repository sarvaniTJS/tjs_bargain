import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindCommentQuery } from 'src/components/CommentCell'
import { QUERY as FindShowBargainQuery } from 'src/components/ShowBargainCell'

import CommentCell from '../CommentCell/CommentCell'
import CommentForm from '../CommentForm/CommentForm'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const Comment = ({ comment, bargainId }) => {
  const [showForm, setShowForm] = useState(false)
  const [showChildComments, setShowChildComments] = useState(false)
  const { userMetadata } = useAuth()
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
  console.log(comment.user.externalId, userMetadata.sub)
  return (
    <>
      <Toaster />
      <p>
        {comment.user.userName}: {comment.comment}
      </p>
      <button onClick={() => setShowForm(comment.id)}>Comment</button>
      <button onClick={() => setShowChildComments(comment.id)}>
        view replies
      </button>
      {comment.user.externalId === userMetadata.sub && (
        <button onClick={() => onDeleteClick(comment.id)}>Delete</button>
      )}
      {showForm === comment.id && (
        <>
          <CommentForm bargainId={bargainId.id} parentCommentId={comment.id} />
          <CommentCell parentCommentId={comment.id} />
        </>
      )}
      {showChildComments === comment.id && (
        <CommentCell parentCommentId={comment.id} />
      )}
    </>
  )
}

export default Comment
