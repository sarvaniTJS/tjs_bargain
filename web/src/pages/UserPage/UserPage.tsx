import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import EditUser from 'src/components/EditUser/EditUser'
import UserCell from 'src/components/UserCell/UserCell'

const UserPage = () => {
  const { userMetadata, isAuthenticated } = useAuth()
  const [edit, setEdit] = useState(false)

  return (
    <>
      <MetaTags title="User" description="User page" />
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {edit ? 'Edit User' : 'User Settings'}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {edit ? 'User Settings' : 'Edit'}
          </button>
          <button
            type="button"
            disabled
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Change password
          </button>
        </div>
      </div>
      {isAuthenticated &&
        (edit === true ? (
          <EditUser />
        ) : (
          <UserCell externalId={userMetadata.sub} />
        ))}
    </>
  )
}

export default UserPage
