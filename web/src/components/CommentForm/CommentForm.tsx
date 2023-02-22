import { useState } from 'react'

import {
  Form,
  FormError,
  Label,
  TextAreaField,
  Submit,
  SubmitHandler,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindCommentQuery } from 'src/components/CommentCell'

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
  const { userMetadata } = useAuth()
  const formMethods = useForm()

  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      formMethods.reset()
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [{ query: FindCommentQuery, variables: { bargainId } }],
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

      <h3>Leave a Comment</h3>
      <Form onSubmit={onSubmit} formMethods={formMethods}>
        <FormError error={error} />

        <Label name="comment">Comment</Label>
        <TextAreaField name="comment" validation={{ required: true }} />

        <Submit disabled={loading}>Submit</Submit>
      </Form>
    </>
  )
}

export default CommentForm
