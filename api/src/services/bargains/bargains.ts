import type {
  QueryResolvers,
  MutationResolvers,
  BargainRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const bargains: QueryResolvers['bargains'] = ({ product }) => {
  return db.bargain.findMany({
    where: {
      product: {
        contains: product,
        mode: 'insensitive',
      },
    },
  })
}

export const bargain: QueryResolvers['bargain'] = ({ id }) => {
  return db.bargain.findUnique({
    where: { id },
  })
}

export const createBargain: MutationResolvers['createBargain'] = async ({
  input,
}) => {
  const user = await db.user.findUnique({
    where: {
      externalId: input.externalId,
    },
  })
  return db.bargain.create({
    data: {
      product: input.product,
      description: input.description,
      active: input.active,
      userId: user.id,
    },
  })
}

export const updateBargain: MutationResolvers['updateBargain'] = ({
  id,
  input,
}) => {
  return db.bargain.update({
    data: input,
    where: { id },
  })
}

export const deleteBargain: MutationResolvers['deleteBargain'] = ({ id }) => {
  return db.bargain.delete({
    where: { id },
  })
}

export const Bargain: BargainRelationResolvers = {
  votes: (_obj, { root }) => {
    return db.bargain.findUnique({ where: { id: root?.id } }).votes()
  },
  comments: (_obj, { root }) => {
    return db.bargain.findUnique({ where: { id: root?.id } }).comments()
  },
  user: (_obj, { root }) => {
    return db.bargain.findUnique({ where: { id: root?.id } }).user()
  },
}
