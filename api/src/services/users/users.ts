import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = ({ userName }) => {
  return db.user.findMany({
    where: {
      userName: {
        contains: userName,
        mode: 'insensitive',
      },
    },
  })
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  bargains: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).bargains()
  },
  votes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).votes()
  },
  comments: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).comments()
  },
}
