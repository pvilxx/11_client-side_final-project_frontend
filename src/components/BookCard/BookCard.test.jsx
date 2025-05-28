import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookCard from './BookCard';

// Arrange: mock book and handlers
describe('BookCard', () => {
  const mockBook = {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008
  };
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  it('renders book data and action buttons', () => {
    // Act
    render(
      <BookCard book={mockBook} onEdit={onEdit} onDelete={onDelete} />
    );
    // Assert
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /edit/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /delete/i })[0]).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <BookCard book={mockBook} onEdit={onEdit} onDelete={onDelete} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    expect(onEdit).toHaveBeenCalledWith(mockBook);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <BookCard book={mockBook} onEdit={onEdit} onDelete={onDelete} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(onDelete).toHaveBeenCalledWith(mockBook.id);
  });
});
