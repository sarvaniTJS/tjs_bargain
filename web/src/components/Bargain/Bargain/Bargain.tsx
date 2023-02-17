
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag,  } from 'src/lib/formatters'

import type { DeleteBargainMutationVariables, FindBargainById } from 'types/graphql'

const DELETE_BARGAIN_MUTATION = gql`
  mutation DeleteBargainMutation($id: Int!) {
    deleteBargain(id: $id) {
      id
    }
  }
`

interface Props {
  bargain: NonNullable<FindBargainById['bargain']>
}

const Bargain = ({ bargain }: Props) => {
  const [deleteBargain] = useMutation(DELETE_BARGAIN_MUTATION, {
    onCompleted: () => {
      toast.success('Bargain deleted')
      navigate(routes.bargains())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteBargainMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete bargain ' + id + '?')) {
      deleteBargain({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Bargain {bargain.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bargain.id}</td>
            </tr><tr>
              <th>Product</th>
              <td>{bargain.product}</td>
            </tr><tr>
              <th>Description</th>
              <td>{bargain.description}</td>
            </tr><tr>
              <th>Active</th>
              <td>{checkboxInputTag(bargain.active)}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(bargain.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBargain({ id: bargain.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bargain.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Bargain
