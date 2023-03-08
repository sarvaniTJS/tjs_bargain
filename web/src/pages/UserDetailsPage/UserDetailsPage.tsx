import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/UsersCell/UsersCell'

const UserDetailsPage = () => {
  const [search, setSearch] = useState('')

  return (
    <>
      <MetaTags title="UserDetails" description="UserDetails page" />
      <div className="mb-6 px-6">
        <label htmlFor="user" className="sr-only">
          Search User
        </label>
        <input
          type="text"
          name="user"
          id="user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search User"
        />
      </div>
      <UsersCell user={search} />
    </>
  )
}

export default UserDetailsPage
