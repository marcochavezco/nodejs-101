const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().int().min(0).max(10),
  poster: z.string().url({
    required_error: 'Poster is required',
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror','Thriller','Sci-Fi']), 
  {
    required_error: 'Genre is required',
    invalid_type_error: 'Genre must be one of: Action, Adventure, Comedy, Drama, Fantasy, Horror, Thriller, Sci-Fi',
  }
  )
})

function validateMovie(movie) {
  return movieSchema.safeParse(movie)
}

module.exports = { 
  validateMovie
}