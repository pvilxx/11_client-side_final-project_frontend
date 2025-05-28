// BookList.jsx
import styles from './BookList.module.css';
import BookCard from '../BookCard/BookCard';

function BookList({ books, onEdit, onDelete }) {
  return (
    <div className={styles['book-grid']}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;
