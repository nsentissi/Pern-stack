import React from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Books = ({ books, setBooks }) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dateConverter = (date) => {
    return moment(date).utc().format("MM/DD/YYYY");
  };
  return (
    <div>
      {!books ? (
        <p>Loading</p>
      ) : (
        <div className="bookShelf">
          {books.map((book) => (
            <div className="card" key={book.id}>
              <div className="card-image">
                <img src={book.cover_url} alt={book.title} />
              </div>
              <p className="card-title">{book.title}</p>
              {/* <p className="card-body">{book.description}</p> */}
              <p className="footer">
                Written by <span className="by-name">{book.author}</span> on{" "}
                <span className="date">{dateConverter(book.publishedAt)}</span>
              </p>
              <Link to={`/books/${book.id}`}>
                <button className="custom-btn btn-2">Read More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
