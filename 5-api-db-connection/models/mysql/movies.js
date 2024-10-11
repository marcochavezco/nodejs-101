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

  static async getById ({ id }) {
    const [movie] = await connection.query(`
      SELECT
          BIN_TO_UUID(id) AS id,
          title,
          year,
          director,
          duration,
          poster,
          rate
      FROM
        movie
      WHERE
        id = UUID_TO_BIN(?);`, [id])

    return movie
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, rate } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')

    const [{ uuid }] = uuidResult

    try {
      await connection.query(`
        INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`, [title, year, director, duration, poster, rate])
    } catch (error) {
      console.log(error)
      throw new Error('Error creating movie')
    }

    const [movie] = await connection.query(`
      SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate
      FROM movie
      WHERE id = UUID_TO_BIN("${uuid}");`)

    return movie
  }

  static async delete ({ id }) {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;')
    const [movie] = await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id])
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;')

    return movie.affectedRows > 0
  }

  static async update ({ id, input }) {
    let movie
    for (const key in input) {
      movie = await connection.query(`
        UPDATE movie
        SET ${key} = ?
        WHERE id = UUID_TO_BIN(?);`, [input[key], id])
    }
    return [movie]
  }
}
