import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        externalId: 'String9101515',
        email: 'String1068373',
        userName: 'String',
      },
    },
    two: {
      data: {
        externalId: 'String1177500',
        email: 'String6492879',
        userName: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
