import type { ComponentMeta } from '@storybook/react'

import BargainDetailsPage from './BargainDetailsPage'

export const generated = () => {
  return <BargainDetailsPage />
}

export default {
  title: 'Pages/BargainDetailsPage',
  component: BargainDetailsPage,
} as ComponentMeta<typeof BargainDetailsPage>
