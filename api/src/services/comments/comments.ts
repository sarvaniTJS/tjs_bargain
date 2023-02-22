import type {
  QueryResolvers,
  MutationResolvers,
  CommentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const comments: QueryResolvers['comments'] = ({ bargainId }) => {
  return db.comment.findMany({
    where: { bargainId },
  })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = async ({
  input,
}) => {
  const user = await db.user.findUnique({
    where: {
      externalId: input.externalId,
    },
  })
  return db.comment.create({
    data: {
      comment: input.comment,
      active: input.active,
      bargainId: input.bargainId,
      userId: user.id,
    },
  })
}

export const updateComment: MutationResolvers['updateComment'] = ({
  id,
  input,
}) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment: CommentRelationResolvers = {
  bargain: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).bargain()
  },
  user: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root.id } }).user()
  },
}
