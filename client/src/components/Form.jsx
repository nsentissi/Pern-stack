import React, { useState } from "react";
import axios from "axios"

const Form = ({ setBooks, books }) => {
  const [newBook, setNewBook] = useState({
    title: "", 
    author: "",
    description:"",
    category:"",
    cover_url:"",
    publishedAt:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

 const createBook = () =>{
    axios.post("http://localhost:3000/books", newBook)
    .then((response) => {
        setBooks([...books, response.data]);
      })
      .catch((err) => console.log(err));
  };
 
  
 
 return (
    <div>
      <form>
        <h3>Add a new book</h3>
        <input onChange={handleInputChange} name='title' type="text" placeholder="Title" />
        <input onChange={handleInputChange} name='author' type="text" placeholder="author" />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Description"
          name='description'
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Category"
          name='category'
        />
        <input onChange={handleInputChange} type="text" placeholder="URL" name='cover_url' />
        <input onChange={handleInputChange} type="date" name='publishedAt' />
        <button onClick={createBook}>Submit</button>
      </form>
    </div>
  );
 }

export default Form;
