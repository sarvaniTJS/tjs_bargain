import type {
  FindShowBargainQuery,
  FindShowBargainQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindShowBargainQuery($id: Int!) {
    showBargain: bargain(id: $id) {
      id
      product
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindShowBargainQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  showBargain,
}: CellSuccessProps<FindShowBargainQuery, FindShowBargainQueryVariables>) => {
  return (
    <div>
      <h2>{showBargain.product}</h2>
      <p>{showBargain.description}</p>
    </div>
  )
}
