import { useState, useEffect } from 'react';
import styles from './BookForm.module.css';

const initialState = {
  title: '',
  author: '',
  year: '',
  status: 'pending',
};

function BookForm({ addBook, onUpdate, onCancel, loading, error, show, book }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        year: book.year,
        status: book.status,
      });
    } else {
      setForm(initialState);
    }
  }, [book, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book && onUpdate) {
      onUpdate({ ...book, ...form, year: Number(form.year) });
    } else if (addBook) {
      addBook({ ...form, year: Number(form.year) });
    }
  };

  if (!show) return null;

  return (
    <div className={styles['book-form__overlay']}>
      <form className={styles['book-form']} onSubmit={handleSubmit}>
        <div className={styles['book-form__fields']}>
          <input
            className={styles['book-form__input']}
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className={styles['book-form__input']}
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          <input
            className={styles['book-form__input']}
            name="year"
            placeholder="Year"
            type="number"
            min="0"
            value={form.year}
            onChange={handleChange}
            required
          />
          <select
            className={styles['book-form__select']}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">pending</option>
            <option value="in progress">in progress</option>
            <option value="read">read</option>
          </select>
        </div>
        <div className={styles['book-form__actions']}>
          <button
            type="button"
            className={styles['book-form__cancel']}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles['book-form__submit']}
            disabled={loading}
          >
            {book ? 'Update Book' : 'Add Book'}
          </button>
        </div>
        {error && <div className={styles['book-form__error']}>{error}</div>}
      </form>
    </div>
  );
}

export default BookForm;
