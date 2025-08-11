import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import type { PaginationProps } from './Pagination.types';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  const defaultProps: PaginationProps = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders current page and total pages', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
  });

  it('Prev button is enabled when currentPage > 1', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByRole('button', { name: /go to previous page/i });
    expect(prevButton).toBeEnabled();
  });

  it('Next button is enabled when currentPage < totalPages', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByRole('button', { name: /go to next page/i });
    expect(nextButton).toBeEnabled();
  });

  it('Prev button is disabled on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByRole('button', { name: /go to previous page/i });
    expect(prevButton).toBeDisabled();
  });

  it('Next button is disabled on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const nextButton = screen.getByRole('button', { name: /go to next page/i });
    expect(nextButton).toBeDisabled();
  });

  it('clicking Prev calls onPageChange with previous page number', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByRole('button', { name: /go to previous page/i });
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('clicking Next calls onPageChange with next page number', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByRole('button', { name: /go to next page/i });
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
