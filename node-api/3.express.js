const express = require('express')

const dittoJSON = require('./pokemon/ditto.json')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1235

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.send('<h1>404 - Page not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
