import { useEffect, useState } from 'react';

const API_URL = 'https://one1-client-side-final-project-backend-8n0o.onrender.com/books';

async function fetchBooks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch books');
  const data = await response.json();
  return Array.isArray(data) ? data : data.books || [];
}

async function deleteBook(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete book');
}

async function createBook(book) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to create book');
  return response.json();
}

async function updateBook(book) {
  const response = await fetch(`${API_URL}/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to update book');
  return response.json();
}

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch {
        setError('Error loading books');
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleShowEdit = (book) => {
    setBookToEdit(book);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setBookToEdit(null);
    setShowEdit(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError('Error deleting book');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (book) => {
    setLoading(true);
    setError(null);
    try {
      const newBook = await createBook(book);
      setBooks((prev) => [...prev, newBook]);
      setShowForm(false);
    } catch {
      setError('Error creating book');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (book) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateBook(book);
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      setShowEdit(false);
      setBookToEdit(null);
    } catch {
      setError('Error updating book');
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    loading,
    error,
    showForm,
    showEdit,
    bookToEdit,
    handleShowForm,
    handleCloseForm,
    handleShowEdit,
    handleCloseEdit,
    handleDelete,
    handleCreate,
    handleUpdate,
  };
}
