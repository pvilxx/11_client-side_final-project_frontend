import './App.css';
import BookHeader from './components/BookHeader/BookHeader';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import { useBooks } from './hooks/useBooks';

function App() {
  const hook = useBooks();

  return (
    <>
      <BookHeader onAdd={hook.handleShowForm} />
      <BookForm
        addBook={hook.handleCreate}
        onUpdate={hook.handleUpdate}
        onCancel={hook.showEdit ? hook.handleCloseEdit : hook.handleCloseForm}
        loading={hook.loading}
        error={hook.error}
        show={hook.showForm || hook.showEdit}
        book={hook.bookToEdit}
      />
      <BookList
        books={hook.books}
        onEdit={hook.handleShowEdit}
        onDelete={hook.handleDelete}
        loading={hook.loading}
        error={hook.error}
      />
    </>
  );
}

export default App;
