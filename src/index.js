const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

const port = 7331

app.use('/api', require('./routes'))

app.listen(port, () => console.log(`GCMS listening at http://localhost:${port}`))
