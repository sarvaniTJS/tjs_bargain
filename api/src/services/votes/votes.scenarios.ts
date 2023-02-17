import type { Prisma, Vote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.VoteCreateArgs>({
  vote: {
    one: {
      data: {
        vote: 'UPVOTE',
        bargain: { create: { product: 'String', description: 'String' } },
      },
    },
    two: {
      data: {
        vote: 'UPVOTE',
        bargain: { create: { product: 'String', description: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Vote, 'vote'>
