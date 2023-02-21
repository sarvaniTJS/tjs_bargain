import type { CreateBargainInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import BargainForm from 'src/components/Bargain/BargainForm'

const CREATE_BARGAIN_MUTATION = gql`
  mutation CreateBargainMutation($input: CreateBargainInput!) {
    createBargain(input: $input) {
      id
    }
  }
`

const NewBargain = () => {
  const { userMetadata } = useAuth()
  const [createBargain, { loading, error }] = useMutation(
    CREATE_BARGAIN_MUTATION,
    {
      onCompleted: () => {
        toast.success('Bargain created')
        navigate(routes.bargains())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateBargainInput) => {
    createBargain({
      variables: { input: { ...input, externalId: userMetadata.sub } },
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Bargain</h2>
      </header>
      <div className="rw-segment-main">
        <BargainForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBargain
