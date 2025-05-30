import { useState } from 'react';
import styles from './EditBookForm.module.css';

function EditBookForm({ book, onUpdate, onCancel, loading, error }) {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    year: book.year,
    status: book.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...book, ...form, year: Number(form.year) });
  };

  return (
    <div className={styles['edit-form__overlay']}>
      <form className={styles['edit-form']} onSubmit={handleSubmit}>
        <button type="button" className={styles['edit-form__cancel-top']} onClick={onCancel}>
          Cancel
        </button>
        <h2 className={styles['edit-form__title']}>Edit Book</h2>
        <label className={styles['edit-form__label']}>Title
          <input
            className={styles['edit-form__input']}
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles['edit-form__label']}>Author
          <input
            className={styles['edit-form__input']}
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles['edit-form__label']}>Publication Year
          <input
            className={styles['edit-form__input']}
            name="year"
            type="number"
            min="0"
            value={form.year}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles['edit-form__label']}>Reading Status
          <select
            className={styles['edit-form__select']}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="read">Read</option>
          </select>
        </label>
        <button type="submit" className={styles['edit-form__submit']} disabled={loading}>
          Update Book
        </button>
        {error && <div className={styles['edit-form__error']}>{error}</div>}
      </form>
    </div>
  );
}

export default EditBookForm;
