import type { Bargain } from '@prisma/client'

import {
  bargains,
  bargain,
  createBargain,
  updateBargain,
  deleteBargain,
} from './bargains'
import type { StandardScenario } from './bargains.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bargains', () => {
  scenario('returns all bargains', async (scenario: StandardScenario) => {
    const result = await bargains()

    expect(result.length).toEqual(Object.keys(scenario.bargain).length)
  })

  scenario('returns a single bargain', async (scenario: StandardScenario) => {
    const result = await bargain({ id: scenario.bargain.one.id })

    expect(result).toEqual(scenario.bargain.one)
  })

  scenario('creates a bargain', async () => {
    const result = await createBargain({
      input: { product: 'String', description: 'String' },
    })

    expect(result.product).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a bargain', async (scenario: StandardScenario) => {
    const original = (await bargain({ id: scenario.bargain.one.id })) as Bargain
    const result = await updateBargain({
      id: original.id,
      input: { product: 'String2' },
    })

    expect(result.product).toEqual('String2')
  })

  scenario('deletes a bargain', async (scenario: StandardScenario) => {
    const original = (await deleteBargain({
      id: scenario.bargain.one.id,
    })) as Bargain
    const result = await bargain({ id: original.id })

    expect(result).toEqual(null)
  })
})
