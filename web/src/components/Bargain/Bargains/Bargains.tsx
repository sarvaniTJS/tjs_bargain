import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Bargain/BargainsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteBargainMutationVariables, FindBargains } from 'types/graphql'

const DELETE_BARGAIN_MUTATION = gql`
  mutation DeleteBargainMutation($id: Int!) {
    deleteBargain(id: $id) {
      id
    }
  }
`

const BargainsList = ({ bargains }: FindBargains) => {
  const [deleteBargain] = useMutation(DELETE_BARGAIN_MUTATION, {
    onCompleted: () => {
      toast.success('Bargain deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteBargainMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete bargain ' + id + '?')) {
      deleteBargain({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Description</th>
            <th>Active</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bargains.map((bargain) => (
            <tr key={bargain.id}>
              <td>{truncate(bargain.id)}</td>
              <td>{truncate(bargain.product)}</td>
              <td>{truncate(bargain.description)}</td>
              <td>{checkboxInputTag(bargain.active)}</td>
              <td>{timeTag(bargain.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bargain({ id: bargain.id })}
                    title={'Show bargain ' + bargain.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBargain({ id: bargain.id })}
                    title={'Edit bargain ' + bargain.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bargain ' + bargain.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bargain.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BargainsList
