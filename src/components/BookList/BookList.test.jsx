import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from './BookList';

const mockBooks = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
  { id: 2, title: 'Refactoring', author: 'Martin Fowler', year: 1999 }
];
const onEdit = vi.fn();
const onDelete = vi.fn();

describe('BookList', () => {
  it('renders a list of books', () => {
    render(
      <BookList books={mockBooks} onEdit={onEdit} onDelete={onDelete} />
    );
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Refactoring')).toBeInTheDocument();
  });

  it('renders empty state when no books', () => {
    render(
      <BookList books={[]} onEdit={onEdit} onDelete={onDelete} />
    );
    expect(screen.queryByText('Clean Code')).not.toBeInTheDocument();
    expect(screen.queryByText('Refactoring')).not.toBeInTheDocument();
  });
});
