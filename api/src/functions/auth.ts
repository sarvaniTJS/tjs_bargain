import { db } from 'src/lib/db'

exports.handler = async function (event) {
  const { email, sub } = JSON.parse(event.body)
  try {
    const user = await db.user.create({ email, externalId: sub })
    return {
      statusCode: 200,
      body: JSON.stringify({ user }),
    }
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
