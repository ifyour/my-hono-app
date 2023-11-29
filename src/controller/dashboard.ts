import { Hono } from 'hono'

const dashboard = new Hono()

dashboard.get('/user', async (c) => {
  return c.json({
    success: true,
    message: 'success',
    data: [
      {
        name: 'John Doe',
        email: 'hi@hello.com'
      }
    ]
  })
})

export { dashboard }
