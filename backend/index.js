import express from 'express';
import dotenv from 'dotenv';
import mysql, { createConnection, createPool } from 'mysql';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const db = createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
  //host: 'localhost',
  //user: 'root',
  //password: '$RPraba1305!',
  //database: 'test'
});

app.get('/', (req, res) => {
  res.json('Hello from Backend');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ];

  //const values = ['title back', 'desc back', 'cover back'];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = ' DELETE FROM books WHERE id = ? ';

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
