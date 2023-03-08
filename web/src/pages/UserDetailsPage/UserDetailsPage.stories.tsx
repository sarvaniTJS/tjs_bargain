import type { ComponentMeta } from '@storybook/react'

import UserDetailsPage from './UserDetailsPage'

export const generated = () => {
  return <UserDetailsPage />
}

export default {
  title: 'Pages/UserDetailsPage',
  component: UserDetailsPage,
} as ComponentMeta<typeof UserDetailsPage>
