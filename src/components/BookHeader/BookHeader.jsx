import styles from './BookHeader.module.css';

function BookHeader({ onAdd }) {
  return (
    <header className={styles['book-header']}>
      <h1 className={styles['book-header__title']}>My Book Collection</h1>
      <button className={styles['book-header__add-btn']} onClick={onAdd}>
        Add New Book
      </button>
    </header>
  );
}

export default BookHeader;
