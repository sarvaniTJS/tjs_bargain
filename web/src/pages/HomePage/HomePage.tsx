import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ShowBargainsCell from 'src/components/ShowBargainsCell'

const HomePage = () => {
  const { isAuthenticated, logOut, logIn, userMetadata } = useAuth()
  const [search, setSearch] = useState('')
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>TJS Bargain</h1>
      {isAuthenticated && <p>Hello {userMetadata.email}</p>}
      {isAuthenticated ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={logIn}>Log in</button>
      )}
      <br></br>
      <label>Search bargain</label>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ShowBargainsCell product={search} />
    </>
  )
}

export default HomePage
