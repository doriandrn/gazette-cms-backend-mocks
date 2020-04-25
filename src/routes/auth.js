const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
var router = require('express').Router();

// Refresh tokens
const refreshTokens = {}

// JWT middleware
router.use(
  jwt({
    secret: 'dummy'
  }).unless({
    path: ['/api/auth/login', '/api/auth/refresh']
  })
)


// -- Routes --

// [POST] /login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const valid = username.length && password === '123'
  const expiresIn = 15000
  const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1

  if (!valid) {
    throw new Error('Invalid username or password')
  }

  const accessToken = jsonwebtoken.sign(
    {
      handle: username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username,
      scope: ['test', 'user']
    }, 'dummy', {
      expiresIn
    }
  )

  refreshTokens[refreshToken] = {
    accessToken,
    user: {
      handle: username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username
    }
  }

  res.json({
    // token: accessToken
    token: {
      accessToken,
      refreshToken,
      clientId: '123'
    }
  })
})

router.post('/refresh', (req, res, next) => {
  const { refreshToken } = req.body

  if ((refreshToken in refreshTokens)) {
    const user = refreshTokens[refreshToken].user
    const expiresIn = 15
    const newRefreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
    delete refreshTokens[refreshToken]
    const accessToken = jsonwebtoken.sign(
      {
        user: user.username,
        picture: 'https://github.com/nuxt.png',
        name: 'User ' + user.username,
        scope: ['test', 'user']
      }, 'dummy', {
        expiresIn
      }
    )

    refreshTokens[newRefreshToken] = {
      accessToken,
      user: user,
      clientId: '123'
    }

    res.json({
      token: {
        accessToken,
        refreshToken: newRefreshToken
      }
    })
  } else {
    res.sendStatus(401)
  }
})

// [GET] /user
router.get('/user', (req, res, next) => {
  res.json({ user: req.user })
})

// [POST] /logout
router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

module.exports = router
