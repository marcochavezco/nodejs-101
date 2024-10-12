import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'

export const createMoviesRouter = ({ moviesModel }) => {
  const moviesRouter = Router()

  const moviesController = new MoviesController({ moviesModel })

  moviesRouter.get('/', moviesController.getAll)

  moviesRouter.get('/:id', moviesController.getById)

  moviesRouter.post('/', moviesController.create)

  moviesRouter.delete('/:id', moviesController.delete)

  moviesRouter.patch('/:id', moviesController.update)

  return moviesRouter
}
