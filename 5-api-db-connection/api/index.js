import express, { json } from 'express' // require -> commonJS
import { corsModdleware } from '../middleware/cors.js'
import { createMoviesRouter } from '../routes/movies.js'

export const createApp = ({ moviesModel }) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(json())
  app.use(corsModdleware())

  app.use('/movies', createMoviesRouter({ moviesModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
