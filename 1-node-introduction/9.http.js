const http = require('node:http')
const { findAvailablePort } = require('./10.find-port')

const port = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request event')
  res.end('Hi mom')
})

findAvailablePort(port).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
