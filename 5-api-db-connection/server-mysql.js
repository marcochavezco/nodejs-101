import { MoviesModel } from './models/mysql/movies.js'
import { createApp } from './api/index.js'

createApp({ moviesModel: MoviesModel })
