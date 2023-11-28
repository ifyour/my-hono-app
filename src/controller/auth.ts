import { Hono } from 'hono'

const auth = new Hono()

auth.post('/login', async (c) => {
  return c.text('login')
})

auth.post('/signup', async (c) => {
  return c.text('signup')
})

export { auth }
