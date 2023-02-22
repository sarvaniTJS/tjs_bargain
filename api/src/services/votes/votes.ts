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
  return await db.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        externalId: input.externalId,
      },
    })
    const bargain = await tx.bargain.findUnique({
      where: { id: input.bargainId },
    })
    if (input.vote === 'UPVOTE') {
      const upvoteCount = bargain.upvoteCount + 1
      await tx.bargain.update({
        data: { upvoteCount },
        where: { id: input.bargainId },
      })
    }
    if (input.vote === 'DOWNVOTE') {
      const downvoteCount = bargain.downvoteCount + 1
      await tx.bargain.update({
        data: { downvoteCount },
        where: { id: input.bargainId },
      })
    }
    return await tx.vote.create({
      data: {
        vote: input.vote,
        active: input.active,
        bargainId: input.bargainId,
        userId: user.id,
      },
    })
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
