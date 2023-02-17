import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'

import ShowBargainsCellStories from 'src/components/ShowBargainsCell'

const HomePage = () => {
  const { isAuthenticated, signUp } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>TJS Bargain</h1>
      <p>{JSON.stringify({ isAuthenticated })}</p>
      <button onClick={signUp}>sign up</button>
      <ShowBargainsCellStories />
    </>
  )
}

export default HomePage
