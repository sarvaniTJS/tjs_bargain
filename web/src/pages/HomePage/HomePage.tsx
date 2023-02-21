import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ShowBargainsCell from 'src/components/ShowBargainsCell'

const HomePage = () => {
  const { isAuthenticated, logOut, logIn } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>TJS Bargain</h1>
      {isAuthenticated ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={logIn}>Log in</button>
      )}

      <ShowBargainsCell />
    </>
  )
}

export default HomePage
