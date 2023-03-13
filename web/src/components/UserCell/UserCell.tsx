import { PaperClipIcon } from '@heroicons/react/20/solid'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindUserQuery($externalId: String!) {
    user: user(externalId: $externalId) {
      id
      userName
      email
      picture
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  return (
    <div>
      <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <img
                src={user.picture}
                alt=""
                className="h-15 w-15 bg-gray-100"
              />
            </div>
            <div className="sm:col-span-1">
              <div>
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.userName}</dd>
              </div>
              <div className="mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
