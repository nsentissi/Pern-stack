import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  const dateConverter = (date) => {
    return moment(date).utc().format("MM/DD/YYYY");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteBook = () => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then((response) => {
        onDelete(book.id);
        const notify = () => toast("Book deleted successfully");
        notify();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  if (!book) {
    return <p>loading ... </p>;
  }
  return (
    <>
      <div className="singlebook">
        <div className="bookPic">
          <img src={book.cover_url} />
        </div>
        <div className="bookDes">
          <h3>{book.title}</h3>
          <p> Summary : {book.description}</p>
          <p>Written by : {book.author}</p>
          <p>Published : {dateConverter(book.publishedAt)}</p>
          <button onClick={deleteBook} className="btn">
            <p className="paragraph">Delete Book</p>
            <ToastContainer />
            <span className="icon-wrapper">
              <svg
                className="icon"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
