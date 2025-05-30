import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookHeader from './BookHeader';

describe('BookHeader', () => {
  it('renders the main title', () => {
    render(<BookHeader onAddBook={vi.fn()} />);
    expect(screen.getByText(/my book collection/i)).toBeInTheDocument();
  });

  it('calls onAddBook when add button is clicked', () => {
    const onAddBook = vi.fn();
    render(<BookHeader onAddBook={onAddBook} />);
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(onAddBook).toHaveBeenCalled();
  });
});
