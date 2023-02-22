import { useState } from 'react'

import {
  Form,
  FormError,
  Label,
  TextAreaField,
  Submit,
  SubmitHandler,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      comment
      createdAt
    }
  }
`

interface FormValues {
  name: string
  comment: string
}

interface Props {
  postId: number
}

const CommentForm = ({ bargainId }: Props) => {
  const [hasPosted, setHasPosted] = useState(false)
  const { userMetadata } = useAuth()

  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({
      variables: {
        input: {
          bargainId,
          active: true,
          externalId: userMetadata.sub,
          ...input,
        },
      },
    })
  }

  return (
    <>
      <Toaster />

      <div className={hasPosted ? 'hidden' : ''}>
        <h3 className="font-light text-lg text-gray-600">Leave a Comment</h3>
        <Form className="mt-4 w-full" onSubmit={onSubmit}>
          <FormError
            error={error}
            titleClassName="font-semibold"
            wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          />

          <Label
            name="comment"
            className="block mt-4 text-xs font-semibold text-gray-500 uppercase"
          >
            Comment
          </Label>
          <TextAreaField
            name="comment"
            className="block w-full p-1 border rounded h-24 text-sm"
            validation={{ required: true }}
          />

          <Submit
            disabled={loading}
            className="block mt-4 bg-blue-500 text-white text-xs font-semibold uppercase tracking-wide rounded px-3 py-2 disabled:opacity-50"
          >
            Submit
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default CommentForm
