const apiUrl = "https://localhost:7279/api/Books";

const ApiService = {
  getAllBooks: async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    return response.json();
  },

  addBook: async (newBook) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error(`Failed to add book: ${response.statusText}`);
    }
    return response.json();
  },

  updateBook: async (updatedBook) => {
    const response = await fetch(`${apiUrl}/${updatedBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error(`Failed to update book: ${response.statusText}`);
    }
    return response.json();
  },

  deleteBook: async (bookId) => {
    const response = await fetch(`${apiUrl}/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.statusText}`);
    }
  },
};

export default ApiService;
