import React, { useState } from "react";

const BookItem = ({ book, updateBook, deleteBook }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateBook(editedBook);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedBook({ ...book });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleDelete = () => {
    deleteBook(book.id);
  };

  return (
    <div className="book-item">
      {isEditing ? (
        <div>
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            value={editedBook.title}
            onChange={handleChange}
          />
          <h3>Author</h3>
          <input
            type="text"
            name="author"
            value={editedBook.author}
            onChange={handleChange}
          />
          <h3>ISBN</h3>
          <input
            type="text"
            name="isbn"
            value={editedBook.isbn}
            onChange={handleChange}
          />
          <h3>Genre</h3>
          <input
            type="text"
            name="genre"
            value={editedBook.genre}
            onChange={handleChange}
          />
          <h3>Publication Year:</h3>
          <input
            type="text"
            name="publicationYear:"
            value={editedBook.publicationYear}
            onChange={handleChange}
          />
          <h3>Publisher</h3>
          <input
            type="text"
            name="publisher"
            value={editedBook.publisher}
            onChange={handleChange}
          />
          <button className="submitBtn" onClick={handleSave}>
            Save
          </button>
          <button className="submitBtn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            <span>Title:</span>
            {book.title}
          </p>
          <p>
            <span>Author:</span> {book.author}
          </p>
          <p>
            <span>ISBN:</span> {book.isbn}
          </p>
          <p>
            <span>Genre:</span> {book.genre}
          </p>
          <p>
            <span>Publication Year:</span> {book.publicationYear}
          </p>
          <p>
            <span>Publisher:</span> {book.publisher}
          </p>
          <button className="editBtn" onClick={handleEdit}>
            Edit
          </button>
          <button className="deleteBtn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookItem;
