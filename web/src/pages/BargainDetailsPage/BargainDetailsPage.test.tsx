import { render } from '@redwoodjs/testing/web'

import BargainDetailsPage from './BargainDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BargainDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BargainDetailsPage />)
    }).not.toThrow()
  })
})
