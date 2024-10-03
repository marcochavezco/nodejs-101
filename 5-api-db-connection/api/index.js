import express, { json } from 'express' // require -> commonJS
import { corsModdleware } from '../middleware/cors.js'
import { moviesRouter } from '../routes/movies.js'

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsModdleware())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

export default app
