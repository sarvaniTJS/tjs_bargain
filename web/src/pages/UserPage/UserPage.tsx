import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import UserCell from 'src/components/UserCell/UserCell'

const UserPage = () => {
  const { userMetadata, isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="User" description="User page" />

      {isAuthenticated && <UserCell externalId={userMetadata.sub} />}
    </>
  )
}

export default UserPage
