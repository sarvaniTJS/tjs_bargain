import type { FindBargainById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Bargain from 'src/components/Bargain/Bargain'

export const QUERY = gql`
  query FindBargainById($id: Int!) {
    bargain: bargain(id: $id) {
      id
      product
      description
      active
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Bargain not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bargain }: CellSuccessProps<FindBargainById>) => {
  return <Bargain bargain={bargain} />
}
