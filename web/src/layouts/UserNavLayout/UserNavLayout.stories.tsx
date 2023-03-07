import type { ComponentMeta, ComponentStory } from '@storybook/react'

import UserNavLayout from './UserNavLayout'

export const generated: ComponentStory<typeof UserNavLayout> = (args) => {
  return <UserNavLayout {...args} />
}

export default {
  title: 'Layouts/UserNavLayout',
  component: UserNavLayout,
} as ComponentMeta<typeof UserNavLayout>
