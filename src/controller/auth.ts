import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'

import { SECRET_TOKEN, JWT_TOKEN_COOKIE_NAME } from '@/config/env'

const auth = new Hono()

auth.post('/signup', async (c) => {
  return c.text('signup')
})

auth.post('/login', async (c) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const expiresTime = 60 * 60 * 24 * 7 // 7 days
  const payload = {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: currentTime,
    exp: currentTime + expiresTime
  }
  const token = await sign(payload, SECRET_TOKEN)
  setCookie(c, JWT_TOKEN_COOKIE_NAME, token, {
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: expiresTime,
    sameSite: 'Strict'
  })
  return c.json({ code: 200, message: 'Token signed and set in cookie.' })
})

export { auth }
