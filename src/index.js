const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

const port = 7331

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).json({ message: 'Something failed!' })
  } else {
    next(err)
  }
}

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function errorHandler (err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.status(500)
  res.json({ message: String(err) })
}

app.use('/api', require('./routes'))

app.use(clientErrorHandler)
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => console.log(`GCMS listening at http://localhost:${port}`))
