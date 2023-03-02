import { db } from 'src/lib/db'

exports.handler = async function (event) {
  const { email, sub, picture } = JSON.parse(event.body) as Record<
    string,
    string
  >
  try {
    const user = await db.user.create({
      data: { email, externalId: sub, userName: email, picture },
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ user }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
