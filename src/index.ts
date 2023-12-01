import 'dotenv/config'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { serve } from '@hono/node-server'

import { SECRET_TOKEN, JWT_TOKEN_COOKIE_NAME } from './config/env'
import { posts, auth, dashboard } from './controller'

const app = new Hono()

/** middleware */
app.use(
  '/dashboard/*',
  jwt({ secret: SECRET_TOKEN, cookie: JWT_TOKEN_COOKIE_NAME })
)

/** router */
app.get('/', (c) => c.json({ hello: 'hono!' }))
app.route('/posts', posts)
app.route('/auth', auth)
app.route('/dashboard', dashboard)

/** global error handling */
app.notFound((c) => c.json({ success: false, message: 'Not Found' }, 404))
app.onError((error: CustomError, c) => {
  console.log('>> App Error', JSON.stringify(error))
  if (error.status === 401) {
    return c.json({ success: false, message: 'Unauthorized' }, 401)
  }
  return c.json({ success: false, message: 'Internal Server Error' }, 500)
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Server listening on http://localhost:3000')
})
