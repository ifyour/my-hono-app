import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { prisma as db } from '@/database'

const post = new Hono()

post.post(
  '/',
  zValidator(
    'json',
    z.object({ title: z.string(), content: z.string() }),
    (result, c) => {
      if (!result.success) {
        return c.json({
          success: false,
          message: 'Incomplete request parameters'
        })
      }
    }
  ),
  async (c) => {
    const { title, content } = await c.req.json()
    const post = await db.post.create({ data: { title, content } })
    return c.json({ success: true, message: 'success', data: post })
  }
)

post.get('/', async (c) => {
  const posts = await db.post.findMany()
  return c.json({ success: true, message: 'success', data: posts })
})

post.get('/:id', async (c) => {
  const id = c.req.param('id')
  const post = await db.post.findFirst({ where: { id: Number(id) } })
  if (post) {
    return c.json({ success: true, message: 'success', data: post })
  }
  return c.json({ success: false, message: 'Not Found' })
})

post.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const post = await db.post
    .delete({ where: { id: Number(id) } })
    .catch(() => false)
  if (!post) {
    return c.json({ success: false, message: 'Not Found' })
  }
  return c.json({ success: true, message: 'success', data: post })
})

export { post }
