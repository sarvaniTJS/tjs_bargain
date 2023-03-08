import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/UsersCell/UsersCell'

const UserDetailsPage = () => {
  return (
    <>
      <MetaTags title="UserDetails" description="UserDetails page" />

      <UsersCell />
    </>
  )
}

export default UserDetailsPage
