import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ setBooks, books }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    cover_url: "",
    publishedAt: "",
  });

  const handleInputChange = (e) => {
   
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
   
  };

  const createBook = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3000/books", newBook)
      .then((response) => {
        setBooks([...books, response.data])
        const notify = () => toast("Book added to the shelf!");
        notify()
        setNewBook({ 
          title: "",
          author: "",
          description: "",
          category: "",
          cover_url: "",
          publishedAt: "",
        });
      })
      .catch((err) => console.log(err));

      
  };

  return (
    <div>
      <h3>ADD A NEW BOOK</h3>
      <form className="form">
        <div className="flex">
          <label>
            <input
              onChange={handleInputChange}
              required=""
              placeholder=""
              type="text"
              className="input"
              name="title"
            />
            <span>Title</span>
          </label>

          <label>
            <input
              onChange={handleInputChange}
              required=""
              placeholder=""
              type="text"
              className="input"
              name="author"
            />
            <span>Author</span>
          </label>
        </div>

        <label>
          <input
            onChange={handleInputChange}
            required=""
            placeholder=""
            type="text"
            className="input"
            name="description"
          />
          <span>Description</span>
        </label>

        <label>
          <input
            onChange={handleInputChange}
            required=""
            placeholder=""
            type="text"
            className="input"
            name="category"
          />
          <span>Category</span>
        </label>

        <label>
          <input
            onChange={handleInputChange}
            required=""
            placeholder=""
            type="text"
            className="input"
            name="cover_url"
          />
          <span>URL</span>
        </label>

        <label>
          <input
            onChange={handleInputChange}
            required=""
            type="date"
            placeholder=""
            className="input"
            name="publishedAt"
          />
          <span>Published At</span>
        </label>
        <div>
          <button className="fancy" onClick={createBook}>
            <span className="top-key"></span>
            <span className="text">Submit</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
            <ToastContainer />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
