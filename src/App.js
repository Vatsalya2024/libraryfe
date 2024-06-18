import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import BookForm from "./BookForm";
import BookList from "./BookList";
import ApiService from "./ApiService";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksData = await ApiService.getAllBooks();
      setBooks(booksData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  const addBook = async (newBook) => {
    try {
      const addedBook = await ApiService.addBook(newBook);
      setBooks([...books, addedBook]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding Book", error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const updatedBookData = await ApiService.updateBook(updatedBook);
      const updatedBooks = books.map((book) =>
        book.id === updatedBookData.id ? updatedBookData : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error Updating Book", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await ApiService.deleteBook(bookId);
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error Deleting Book", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="animate__animated animate__fadeInDown">
          Library Management System
        </h1>
      </header>
      <main className="App-main container mt-4">
        <div className="card-container">
          <div className="card animate__animated animate__fadeInLeft">
            <div className="card-body">
              <h2 className="card-title">Add a New Book</h2>
              <BookForm addBook={addBook} />
            </div>
          </div>
          <div className="card animate__animated animate__fadeInRight">
            <div className="card-body">
              <h2 className="card-title">All Books</h2>
              {isLoading ? (
                <p className="loading animate__animated animate__flash">
                  Loading...
                </p>
              ) : (
                <BookList
                  books={books}
                  updateBook={updateBook}
                  deleteBook={deleteBook}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
