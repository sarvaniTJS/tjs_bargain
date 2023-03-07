import type { ShowBargainsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ShowBargainsQuery($product: String) {
    showBargains: bargains(product: $product) {
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

export const Empty = () => <div>No bargains to display</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  showBargains,
}: CellSuccessProps<ShowBargainsQuery>) => {
  return (
    <ul className="divide-y divide-gray-200">
      {showBargains.map((item) => (
        <li key={item.id} className="flex py-4">
          <img
            className="h-10 w-10 rounded-full"
            src="https://s.gravatar.com/avatar/422d7242d6a1a55e64842f4be6c05c0b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fus.png"
            alt=""
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <Link to={routes.showBargain({ id: item.id })}>
                {item.product}
              </Link>{' '}
              <span className="text-sm text-gray-500">
                by {item.user.userName}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              {item.description.slice(0, 75)}...
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
