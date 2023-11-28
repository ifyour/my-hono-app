import 'dotenv/config'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { serve } from '@hono/node-server'

import { SECRET_TOKEN } from './config/env'
import { post } from './controller/post'

const app = new Hono()

app.use('/auth/*', jwt({ secret: SECRET_TOKEN, cookie: 'jwt-token' }))

app.get('/', (c) => c.json({ hello: 'hono!' }))

app.route('/post', post)

app.onError((error: CustomError, c) => {
  if (error.status === 401) {
    return c.json({ code: 401, message: 'Unauthorized', data: null }, 401)
  }
  return c.json(
    { code: 500, message: 'Internal Server Error', data: null },
    500
  )
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Server listening on http://localhost:3000')
})
