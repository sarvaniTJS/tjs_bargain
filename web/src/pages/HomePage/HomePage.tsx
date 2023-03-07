import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import ShowBargainsCell from 'src/components/ShowBargainsCell'

const HomePage = () => {
  const [search, setSearch] = useState('')
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ShowBargainsCell product={search} />
    </>
  )
}

export default HomePage
