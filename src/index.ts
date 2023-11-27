import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { prisma as db } from './database'

const app = new Hono()

app.get('/', (c) => c.json({ hello: 'hono!' }))

app.get('/posts', async (c) => {
  const posts = await db.post.findMany()
  return c.json({
    code: 200,
    message: 'success',
    data: posts
  });
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Server listening on http://localhost:3000')
})
