import { useState } from 'react'

import CommentCell from '../CommentCell/CommentCell'
import CommentForm from '../CommentForm/CommentForm'

const Comment = ({ comment, bargainId }) => {
  const [showForm, setShowForm] = useState(false)
  const [showChildComments, setShowChildComments] = useState(false)
  return (
    <>
      <p>
        {comment.user.userName}: {comment.comment}
      </p>
      <button onClick={() => setShowForm(comment.id)}>Comment</button>
      <button onClick={() => setShowChildComments(comment.id)}>
        view replies
      </button>
      {showForm === comment.id && (
        <CommentForm bargainId={bargainId.id} parentCommentId={comment.id} />
      )}
      {showChildComments === comment.id && (
        <CommentCell parentCommentId={comment.id} />
      )}
    </>
  )
}

export default Comment
