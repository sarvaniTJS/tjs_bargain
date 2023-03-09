import { useState } from 'react'

import type { UsersQuery } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query UsersQuery($user: String) {
    users(userName: $user) {
      id
      userName
      email
      picture
      active
      roles
    }
  }
`

const UPDATE = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      active
      roles
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps<UsersQuery>) => {
  const [mode, setMode] = useState('default')
  const [editId, setEditId] = useState()
  const [active, setactive] = useState('')
  const [role, setRole] = useState('')

  const [updateUser, { loading, error }] = useMutation(UPDATE, {
    onCompleted: () => {
      toast.success('User updated')
      setMode('default')
    },
    refetchQueries: [{ query: QUERY, variables: { userName: '' } }],
  })

  const onEdit = (user) => {
    if (mode !== 'edit') {
      setMode('edit')
      setEditId(user.id)
      setactive(user.active)
      setRole(user.role)
    }
    if (mode === 'edit') {
      updateUser({
        variables: {
          id: user.id,
          input: {
            active: active === 'true' ? true : false,
            roles: role,
          },
        },
      })
    }
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their Username,
            Active status, email and role.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Active
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.userName}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {mode === 'edit' && editId === user.id ? (
                        <select
                          id="role"
                          name="eole"
                          className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={user.active ? 'active' : 'deactive'}
                          value={active}
                          onChange={(e) => setactive(e.target.value)}
                        >
                          <option value="true">Active</option>
                          <option value="false">Deactive</option>
                        </select>
                      ) : user.active ? (
                        'active'
                      ) : (
                        'deactive'
                      )}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {mode === 'edit' && editId === user.id ? (
                        <select
                          id="role"
                          name="eole"
                          className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={user.roles}
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      ) : (
                        user.roles
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => onEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {mode === 'edit' && editId === user.id
                          ? 'Save'
                          : 'Edit'}
                        <span className="sr-only">, {user.userName}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
