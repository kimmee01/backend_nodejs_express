import knex from 'knex'

export default function(config) {
  let db = knex(config)

  setInterval(async () => {
    try {
      await db.raw('select now()')
      if (process.env.DEBUG) {
        console.log('mysql keep OK')
      }
    } catch (error) {
      console.log('mysql keep error', error.message)
    }
  }, 60_000)

  return db
}
