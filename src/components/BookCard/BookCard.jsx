// BookCard.jsx
import styles from './BookCard.module.css';

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className={styles['book-card']}>
      <div className={styles['book-card__row']}>
        <h2 className={styles['book-card__title']}>{book.title}</h2>
        <span className={styles['book-card__year']}>{book.year}</span>
      </div>
      <div className={styles['book-card__author']}>{book.author}</div>
      <div className={`${styles['book-card__row']} ${styles['book-card__row--bottom']}`}>
        <span className={
          `${styles['book-card__status']} ` +
          (book.status === 'pending'
            ? styles['book-card__status--pending']
            : book.status === 'in progress'
            ? styles['book-card__status--in-progress']
            : styles['book-card__status--read'])
        }>
          {book.status}
        </span>
        <div className={styles['book-card__actions']}>
          <button className={styles['book-card__edit']} onClick={() => onEdit(book)}>
            Edit
          </button>
          <button className={styles['book-card__delete']} onClick={() => onDelete(book.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
