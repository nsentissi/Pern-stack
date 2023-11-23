import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";

import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Form books={books} setBooks={setBooks}/>
      {!books ? (
        <p>Loading</p>
      ) : (
        books.map((book) => {
          return (
            <ul key={book.id}>
              <li>Title : {book.title}</li>
              <li>Author : {book.author}</li>
              <li>Description :{book.description}</li>
              <li>Category :{book.category}</li>
              <li>URL : {book.cover_url}</li>
              <li>Published : {book.publishedat}</li>
            </ul>
          );
        })
      )}
    </>
  );
}

export default App;
