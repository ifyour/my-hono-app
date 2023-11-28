import { Hono } from 'hono'
import { prisma as db } from '@/database'

const post = new Hono()

post.post('/', async (c) => {
  const { title, content } = await c.req.json()
  const post = await db.post.create({ data: { title, content } })
  return c.json({ code: 200, message: 'success', data: post })
})

post.get('/', async (c) => {
  const posts = await db.post.findMany()
  return c.json({ code: 200, message: 'success', data: posts })
})

post.get('/:id', async (c) => {
  const id = c.req.param('id')
  const post = await db.post.findFirst({ where: { id: Number(id) } })
  if (post) {
    return c.json({ code: 200, message: 'success', data: post })
  }
  return c.json({ code: 404, message: 'Not Found', data: null }, 404)
})

post.delete('/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const post = await db.post.delete({ where: { id: Number(id) } })
    return c.json({ code: 200, message: 'success', data: post })
  } catch (error: any) {
    return c.json({ code: 200, message: error.meta?.cause })
  }
})

export { post }
