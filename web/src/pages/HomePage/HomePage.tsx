import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ShowBargainsCellStories from 'src/components/ShowBargainsCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>TJS Bargain</h1>
      <ShowBargainsCellStories />
    </>
  )
}

export default HomePage
