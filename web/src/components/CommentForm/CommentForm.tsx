function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
import { QUERY as FindShowBargainQuery } from 'src/components/ShowBargainCell'

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

const CommentForm = ({ bargainId, parentCommentId }: Props) => {
  const { userMetadata } = useAuth()
  const formMethods = useForm()

  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      formMethods.reset()
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [
      { query: FindShowBargainQuery, variables: { id: bargainId } },
      {
        query: FindCommentQuery,
        variables: { parentCommentId: parentCommentId },
      },
    ],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({
      variables: {
        input: {
          bargainId,
          active: true,
          externalId: userMetadata.sub,
          parentCommentId,
          ...input,
        },
      },
    })
  }
  return (
    <>
      <Toaster />
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src="https://s.gravatar.com/avatar/422d7242d6a1a55e64842f4be6c05c0b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fus.png"
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <Form onSubmit={onSubmit} formMethods={formMethods}>
            <FormError error={error} />

            <div className="focus-within:border-indigo-600">
              <Label name="comment" className="sr-only">
                Add your comment
              </Label>
              <TextAreaField
                rows={2}
                name="comment"
                id="comment"
                className="p-3 block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Add your comment..."
                // defaultValue={''}
                validation={{ required: true }}
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex-shrink-0">
                <Submit
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={loading}
                >
                  Submit
                </Submit>
              </div>
            </div>
          </Form>
        </div>
      </div>

      {/* <Form onSubmit={onSubmit} formMethods={formMethods}>
        <FormError error={error} />

        <Label name="comment">Comment</Label>
        <TextAreaField name="comment" validation={{ required: true }} />

        <Submit disabled={loading}>Submit</Submit>
      </Form> */}
    </>
  )
}

export default CommentForm
