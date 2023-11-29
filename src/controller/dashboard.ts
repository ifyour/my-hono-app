import { Hono } from 'hono'

const dashboard = new Hono()

dashboard.get('/user', async (c) => {
  return c.json({
    code: 200,
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
