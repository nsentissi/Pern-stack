import { useState, useEffect } from "react";
import Form from "./components/Form";
import "./App.css";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import { Routes, Route } from "react-router-dom";
import BookDetail from "./components/BookDetail";

function App() {
  const [books, setBooks] = useState([]);

  return (
    <>
    <Navbar />
    <Routes>
      <Route
        exact
        path="/"
        element={<Form books={books} setBooks={setBooks} />}
      />
      <Route
        path="/books"
        element={<Books books={books} setBooks={setBooks} />}
      />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  </>
  );
}

export default App;
