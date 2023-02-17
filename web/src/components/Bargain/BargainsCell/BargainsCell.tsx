import type { FindBargains } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Bargains from 'src/components/Bargain/Bargains'

export const QUERY = gql`
  query FindBargains {
    bargains {
      id
      product
      description
      active
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bargains yet. '}
      <Link
        to={routes.newBargain()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bargains }: CellSuccessProps<FindBargains>) => {
  return <Bargains bargains={bargains} />
}
