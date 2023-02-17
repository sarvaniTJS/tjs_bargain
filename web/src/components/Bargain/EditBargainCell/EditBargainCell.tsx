import type { EditBargainById, UpdateBargainInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BargainForm from 'src/components/Bargain/BargainForm'

export const QUERY = gql`
  query EditBargainById($id: Int!) {
    bargain: bargain(id: $id) {
      id
      product
      description
      active
      createdAt
    }
  }
`
const UPDATE_BARGAIN_MUTATION = gql`
  mutation UpdateBargainMutation($id: Int!, $input: UpdateBargainInput!) {
    updateBargain(id: $id, input: $input) {
      id
      product
      description
      active
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bargain }: CellSuccessProps<EditBargainById>) => {
  const [updateBargain, { loading, error }] = useMutation(
    UPDATE_BARGAIN_MUTATION,
    {
      onCompleted: () => {
        toast.success('Bargain updated')
        navigate(routes.bargains())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateBargainInput,
    id: EditBargainById['bargain']['id']
  ) => {
    updateBargain({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Bargain {bargain?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BargainForm bargain={bargain} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
