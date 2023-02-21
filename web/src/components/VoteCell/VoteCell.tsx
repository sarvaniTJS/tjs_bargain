import type { FindVoteQuery, FindVoteQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindVoteQuery($id: Int!) {
    vote: vote(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindVoteQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  vote,
}: CellSuccessProps<FindVoteQuery, FindVoteQueryVariables>) => {
  return <div>{JSON.stringify(vote)}</div>
}
