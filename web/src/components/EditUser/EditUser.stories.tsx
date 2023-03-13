// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EditUser> = (args) => {
//   return <EditUser {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import EditUser from './EditUser'

export const generated = () => {
  return <EditUser />
}

export default {
  title: 'Components/EditUser',
  component: EditUser,
} as ComponentMeta<typeof EditUser>
