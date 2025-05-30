import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EditBookForm from './EditBookForm';

describe('EditBookForm', () => {
  const onSubmit = vi.fn();
  const onCancel = vi.fn();
  const book = { id: 1, title: 'Edit Book', author: 'Edit Author', year: 2020 };

  it('renders form fields with book data', () => {
    render(<EditBookForm book={book} onSubmit={onSubmit} onCancel={onCancel} />);
    expect(screen.getByDisplayValue('Edit Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Edit Author')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2020')).toBeInTheDocument();
  });

  it('calls onSubmit with edited data', () => {
    render(<EditBookForm book={book} onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<EditBookForm book={book} onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
