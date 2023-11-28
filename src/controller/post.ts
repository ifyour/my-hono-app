import { Hono } from 'hono'
import { prisma as db } from '@/database'

const post = new Hono()

post.get('/', async (c) => {
  const posts = await db.post.findMany()
  return c.json({ code: 200, message: 'success', data: posts })
})

export { post }
