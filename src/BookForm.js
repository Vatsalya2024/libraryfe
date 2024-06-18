import React, { useState } from "react";

const BookForm = ({ addBook }) => {
  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publicationYear: "",
    publisher: "",
    totalCopies: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
      case "author":
      case "genre":
      case "publisher":
        if (!value) error = "This field is required.";
        break;
      case "isbn":
        if (!value) error = "This field is required.";
        else if (!/^\d{13}$/.test(value)) error = "ISBN must be 13 digits.";
        break;
      case "publicationYear":
        if (!value) error = "This field is required.";
        else if (
          !/^\d{4}$/.test(value) ||
          value < 0 ||
          value > new Date().getFullYear()
        ) {
          error = "Enter a valid year.";
        }
        break;
      case "totalCopies":
        if (!value) error = "This field is required.";
        else if (value < 1) error = "Total copies must be at least 1.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = Object.keys(newBook).every((key) =>
      validate(key, newBook[key])
    );
    if (valid) {
      addBook(newBook);
      setNewBook({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publicationYear: "",
        publisher: "",
        totalCopies: "",
      });
      setShowForm(false);
    }
  };

  return (
    <div className="book-form-container">
      {!showForm && (
        <button className="submitBtn" onClick={() => setShowForm(true)}>
          Add Book
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newBook.title}
              onChange={handleChange}
              required
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={handleChange}
              required
            />
            {errors.author && <p className="error">{errors.author}</p>}
          </div>
          <div>
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={handleChange}
              required
            />
            {errors.isbn && <p className="error">{errors.isbn}</p>}
          </div>
          <div>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={newBook.genre}
              onChange={handleChange}
              required
            />
            {errors.genre && <p className="error">{errors.genre}</p>}
          </div>
          <div>
            <input
              type="number"
              name="publicationYear"
              placeholder="Publication Year"
              value={newBook.publicationYear}
              onChange={handleChange}
              required
            />
            {errors.publicationYear && (
              <p className="error">{errors.publicationYear}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={newBook.publisher}
              onChange={handleChange}
              required
            />
            {errors.publisher && <p className="error">{errors.publisher}</p>}
          </div>
          <div>
            <input
              type="number"
              name="totalCopies"
              placeholder="Total Copies"
              value={newBook.totalCopies}
              onChange={handleChange}
              required
            />
            {errors.totalCopies && (
              <p className="error">{errors.totalCopies}</p>
            )}
          </div>
          <button className="submitBtn" type="submit">
            Add Book
          </button>
        </form>
      )}
    </div>
  );
};

export default BookForm;
