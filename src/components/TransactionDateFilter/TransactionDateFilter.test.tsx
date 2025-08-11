import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionDateFilter from './TransactionDateFilter';
import type { TransactionDateFilterProps } from './TransactionDateFilter.types';

describe('TransactionDateFilter', () => {
  const mockSetStartDate = jest.fn();
  const mockSetEndDate = jest.fn();
  const mockHandleLoadTransactions = jest.fn();

  const defaultProps: TransactionDateFilterProps = {
    startDate: '',
    setStartDate: mockSetStartDate,
    endDate: '',
    setEndDate: mockSetEndDate,
    handleLoadTransactions: mockHandleLoadTransactions,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders start and end date inputs and load button', () => {
    render(<TransactionDateFilter {...defaultProps} />);
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load transactions/i })).toBeInTheDocument();
  });

  it('calls setStartDate when start date input changes', () => {
    render(<TransactionDateFilter {...defaultProps} />);
    const startDateInput = screen.getByLabelText(/start date/i);
    fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
    expect(mockSetStartDate).toHaveBeenCalledWith('2023-01-01');
  });

  it('calls setEndDate when end date input changes', () => {
    render(<TransactionDateFilter {...defaultProps} />);
    const endDateInput = screen.getByLabelText(/end date/i);
    fireEvent.change(endDateInput, { target: { value: '2023-01-31' } });
    expect(mockSetEndDate).toHaveBeenCalledWith('2023-01-31');
  });

  it('disables Load Transactions button if startDate or endDate is empty', () => {
    // Both empty
    render(<TransactionDateFilter {...defaultProps} />);
    const loadButton = screen.getByRole('button', { name: /load transactions/i });
    expect(loadButton).toBeDisabled();
  });

  it('enables Load Transactions button when both startDate and endDate are set', () => {
    render(<TransactionDateFilter {...defaultProps} startDate="2023-01-01" endDate="2023-01-31" />);
    const loadButton = screen.getByRole('button', { name: /load transactions/i });
    expect(loadButton).toBeEnabled();
  });

  it('calls handleLoadTransactions when Load Transactions button is clicked', () => {
    render(<TransactionDateFilter {...defaultProps} startDate="2023-01-01" endDate="2023-01-31" />);
    const loadButton = screen.getByRole('button', { name: /load transactions/i });
    fireEvent.click(loadButton);
    expect(mockHandleLoadTransactions).toHaveBeenCalledTimes(1);
  });
});
