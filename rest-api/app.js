const express = require('express')

const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies')

const app=express()
app.disable('x-powered-by')

app.use(express.json())

app.get('/movies', (req, res)=> {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req,res)=> {
  const id = req.params.id
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({error: 'Movie not found'})
})

app.post('/movies', (req, res) => {
  
  const result = validateMovie(req.body)

  if(result.error){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }
  
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
  console.log('Server is running on port 3000')
})

