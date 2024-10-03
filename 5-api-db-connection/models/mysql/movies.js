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
    const [movies] = await connection.query('SELECT * FROM movie')
    return movies
  }

  static async getById ({ id }) {}

  static async create ({ input }) {}

  static async delete ({ id }) {}

  static async update ({ id, input }) {}
}
