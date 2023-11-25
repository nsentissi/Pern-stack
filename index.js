const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/books", (req, res) => {
  const { skip, limit } = req.query;

  if (!skip && !limit) {
    pool
      .query("SELECT * FROM books;")
      .then((data) => res.json(data.rows))
      .catch((e) => res.send(e.message));
  } else if (!skip && limit) {
    pool
      .query("SELECT * FROM books LIMIT $1;", [limit])
      .then((data) => res.json(data.rows))
      .catch((e) => res.send(e.message));
  } else {
    pool
      .query("SELECT * FROM books LIMIT $1 OFFSET $2;", [limit, skip])
      .then((data) => res.json(data.rows))
      .catch((e) => res.send(e.message));
  }
});
app.post("/books", (req, res) => {
  const {
    title,
    author,
    description,
    category,
    cover_url,
    publishedAt,
    
  } = req.body;

  pool
    .query(
      "INSERT INTO books (title, author, description, category, cover_url, publishedAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [title, author, description, category, cover_url, publishedAt] 
    )
    .then((data) => res.json(data.rows[0]))
    .catch((e) => res.send(e.message));
});


app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM books WHERE id=$1;", [id])
    .then((data) => res.json(data))
    .catch((e) => res.send(e.message));
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
