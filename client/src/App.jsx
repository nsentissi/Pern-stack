import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import "./App.css";
import moment from"moment";

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

  const dateConverter = (date) =>{
   return moment(date).utc().format('MM/DD/YYYY')
  }

  return (
    <>
      <Form books={books} setBooks={setBooks} />
      {!books ? (
        <p>Loading</p>
      ) : (
        books.map((book) => {
          return (
            <ul className="bookShelf" key={book.id}>
              <h2>{book.title}</h2>
              <img src={book.cover_url} alt={book.title} />
              <p>Author : {book.author}</p>
              <p>Description :{book.description}</p>
              <p>Category :{book.category}</p>
              <p>Published : {dateConverter(book.publishedat)}</p>
            </ul>
          );
        })
      )}
    </>
  );
}

export default App;
