import { render } from '@redwoodjs/testing/web'

import UserNavLayout from './UserNavLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserNavLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserNavLayout />)
    }).not.toThrow()
  })
})
