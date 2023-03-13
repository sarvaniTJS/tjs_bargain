import { render } from '@redwoodjs/testing/web'

import EditUser from './EditUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUser />)
    }).not.toThrow()
  })
})
