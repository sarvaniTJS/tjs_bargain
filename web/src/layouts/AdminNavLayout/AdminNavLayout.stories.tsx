import type { ComponentMeta, ComponentStory } from '@storybook/react'

import AdminNavLayout from './AdminNavLayout'

export const generated: ComponentStory<typeof AdminNavLayout> = (args) => {
  return <AdminNavLayout {...args} />
}

export default {
  title: 'Layouts/AdminNavLayout',
  component: AdminNavLayout,
} as ComponentMeta<typeof AdminNavLayout>
