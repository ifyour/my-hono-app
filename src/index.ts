import 'dotenv/config'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { serve } from '@hono/node-server'

import { SECRET_TOKEN } from './config/env'
import { post, auth } from './controller'

const app = new Hono()

/** middleware */
app.use('/auth/*', jwt({ secret: SECRET_TOKEN, cookie: 'jwt-token' }))

/** router */
app.get('/', (c) => c.json({ hello: 'hono!' }))
app.route('/post', post)
app.route('/auth', auth)

/** global error handling */
app.onError((error: CustomError, c) => {
  if (error.status === 401) {
    return c.json({ code: 401, message: 'Unauthorized' }, 401)
  }
  return c.json({ code: 500, message: 'Internal Server Error' }, 500)
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Server listening on http://localhost:3000')
})
