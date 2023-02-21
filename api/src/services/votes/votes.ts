import type {
  QueryResolvers,
  MutationResolvers,
  VoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const votes: QueryResolvers['votes'] = () => {
  return db.vote.findMany()
}

export const vote: QueryResolvers['vote'] = ({ id }) => {
  return db.vote.findUnique({
    where: { id },
  })
}

export const createVote: MutationResolvers['createVote'] = async ({
  input,
}) => {
  const user = await db.user.findUnique({
    where: {
      externalId: input.externalId,
    },
  })
  return db.vote.create({
    data: {
      vote: input.vote,
      active: input.active,
      bargainId: input.bargainId,
      userId: user.id,
    },
  })
}

export const updateVote: MutationResolvers['updateVote'] = ({ id, input }) => {
  return db.vote.update({
    data: input,
    where: { id },
  })
}

export const deleteVote: MutationResolvers['deleteVote'] = ({ id }) => {
  return db.vote.delete({
    where: { id },
  })
}

export const Vote: VoteRelationResolvers = {
  bargain: (_obj, { root }) => {
    return db.vote.findUnique({ where: { id: root?.id } }).bargain()
  },
}
