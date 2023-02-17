import type { Prisma, Comment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        comment: 'String',
        bargain: { create: { product: 'String', description: 'String' } },
      },
    },
    two: {
      data: {
        comment: 'String',
        bargain: { create: { product: 'String', description: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Comment, 'comment'>
