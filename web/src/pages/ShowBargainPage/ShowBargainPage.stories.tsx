import type { ComponentMeta } from '@storybook/react'

import ShowBargainPage from './ShowBargainPage'

export const generated = () => {
  return <ShowBargainPage />
}

export default {
  title: 'Pages/ShowBargainPage',
  component: ShowBargainPage,
} as ComponentMeta<typeof ShowBargainPage>
