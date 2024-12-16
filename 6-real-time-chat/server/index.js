import express from 'express';
import logger from 'morgan';
import { createClient } from '@libsql/client';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: 'libsql://prompt-trauma-marcochavezco.turso.io',
  authToken: process.env.DB_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
  )
`);

io.on('connection', async (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', async (msg) => {
    let result;
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content) VALUES (:msg)',
        args: { msg },
      });
    } catch (e) {
      console.error(e);
    }

    io.emit('chat message', msg, result.lastInsertRowid.toString());
  });

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id, content FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit('chat message', row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error(e);
    }
  }
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
