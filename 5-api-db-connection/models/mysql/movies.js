import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'movies_db'
}

const connection = await mysql.createConnection(config)

export class MoviesModel {
  static async getAll ({ genre }) {
    if (genre) {
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE name = ?', [genre.toLowerCase()])

      if (genres.length === 0) return 0

      const [{ id }] = genres

      const [moviesGenre] = await connection.query(`
        SELECT
            BIN_TO_UUID(movie_genres.movie_id) AS id,
            movie.title,
            genre.name
        FROM
            movie_genres
        JOIN
            movie ON movie.id = movie_genres.movie_id
        JOIN
            genre ON movie_genres.genre_id = genre.id
        WHERE
            movie_genres.genre_id = ?;`, [id])

      return moviesGenre
    }

    const [movies] = await connection.query(`
      SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie;
      `)

    return movies
  }

  static async getById ({ id }) {}

  static async create ({ input }) {}

  static async delete ({ id }) {}

  static async update ({ id, input }) {}
}
