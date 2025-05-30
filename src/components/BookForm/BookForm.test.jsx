import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookForm from './BookForm';

describe('BookForm', () => {
  const onSubmit = vi.fn();
  const onCancel = vi.fn();

  it('renders form fields', () => {
    render(<BookForm onSubmit={onSubmit} onCancel={onCancel} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data', () => {
    render(<BookForm onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Book' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/year/i), { target: { value: '2024' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('renders with initial values in edit mode', () => {
    const book = { id: 1, title: 'Edit Book', author: 'Edit Author', year: 2020 };
    render(<BookForm book={book} onSubmit={onSubmit} onCancel={onCancel} />);
    expect(screen.getByDisplayValue('Edit Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Edit Author')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2020')).toBeInTheDocument();
  });
});
