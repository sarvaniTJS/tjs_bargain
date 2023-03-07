import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import ShowBargainsCell from 'src/components/ShowBargainsCell'

const HomePage = () => {
  const [search, setSearch] = useState('')
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div>
        <label htmlFor="bargain" className="sr-only">
          Search Bargain
        </label>
        <input
          type="text"
          name="bargain"
          id="bargain"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search Bargain"
        />
      </div>

      <ShowBargainsCell product={search} />
    </>
  )
}

export default HomePage
