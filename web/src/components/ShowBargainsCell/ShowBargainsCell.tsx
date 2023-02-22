import type { ShowBargainsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ShowBargainsQuery {
    showBargains: bargains {
      id
      product
      description
      user {
        userName
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  showBargains,
}: CellSuccessProps<ShowBargainsQuery>) => {
  console.log('showBargains', showBargains)
  return (
    <ul>
      {showBargains.map((item) => {
        return (
          <li key={item.id}>
            <Link to={routes.showBargain({ id: item.id })}>{item.product}</Link>
            <p>{item.user.userName}</p>
            <p>{item.description}</p>
          </li>
        )
      })}
    </ul>
  )
}
