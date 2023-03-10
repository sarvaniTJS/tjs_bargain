import type { ShowBargainsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ShowBargainsQuery($product: String) {
    showBargains: bargains(product: $product) {
      id
      product
      description
      active
      user {
        userName
        picture
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
  const activeShowBargains = showBargains.filter(
    (bargain) => bargain.active === true
  )
  return (
    <ul className="divide-y divide-gray-200">
      {activeShowBargains.map((item) => (
        <li key={item.id} className="flex py-4">
          <img
            className="h-10 w-10 rounded-full"
            src={item.user.picture}
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
