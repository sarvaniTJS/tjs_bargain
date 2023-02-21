import { render } from '@redwoodjs/testing/web'

import VoteForm from './VoteForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VoteForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VoteForm />)
    }).not.toThrow()
  })
})
