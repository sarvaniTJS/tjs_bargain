import type { Prisma, Bargain } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BargainCreateArgs>({
  bargain: {
    one: { data: { product: 'String', description: 'String' } },
    two: { data: { product: 'String', description: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Bargain, 'bargain'>
