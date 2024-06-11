const http = require('node:http')

const port = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Welcome to the homepage!</h1>')
  } else if (req.url === '/contact') {
    res.end('<h1>Contact us</h1><p>Send us a message!</p>')
  } else {
    res.statusCode = 404
    res.end('<h1>404 - Page not found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
