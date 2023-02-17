import type {
  QueryResolvers,
  MutationResolvers,
  BargainRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const bargains: QueryResolvers['bargains'] = () => {
  return db.bargain.findMany()
}

export const bargain: QueryResolvers['bargain'] = ({ id }) => {
  return db.bargain.findUnique({
    where: { id },
  })
}

export const createBargain: MutationResolvers['createBargain'] = ({
  input,
}) => {
  return db.bargain.create({
    data: input,
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
}
