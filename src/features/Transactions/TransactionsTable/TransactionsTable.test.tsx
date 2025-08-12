import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionsTable from './TransactionsTable';
import type { Transactions } from '../../../types/transactions';

const mockTransactions: Transactions[] = [
  {
    id: 1,
    transactionDate: '2023-07-01',
    tradeAmount: 123.45,
    currencyCode: 'USD',
    typeName: 'Buy',
    account: { name: 'Main Account', number: '123456' },
    marketPlace: { name: 'NYSE' },
    security: { name: 'AAPL' },
    unitPrice: 150.75,
    quantity: 10,
  },
  {
    id: 2,
    transactionDate: '2023-07-02',
    tradeAmount: 200,
    currencyCode: 'EUR',
    typeName: 'Sell',
    quantity: 0,
    unitPrice: 0,
  },
];

describe('TransactionsTable', () => {
  it('renders "No transactions found." if transactions list is empty', () => {
    render(<TransactionsTable transactions={[]} />);
    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });

  it('renders transactions in table rows', () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2023-07-01')).toBeInTheDocument();
    expect(screen.getByText('123.45')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2023-07-02')).toBeInTheDocument();
    expect(screen.getByText('200.00')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('Sell')).toBeInTheDocument();
  });

  it('toggles transaction details when row is clicked', () => {
    render(<TransactionsTable transactions={mockTransactions} />);

    // Details not visible initially
    expect(screen.queryByText(/Transaction Details/i)).not.toBeInTheDocument();

    // Click first transaction row
    const firstRow = screen.getAllByRole('button', { expanded: false })[0];
    fireEvent.click(firstRow);

    // Details visible now
    expect(screen.getByText(/Transaction Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Name:/i).nextSibling?.textContent).toBe('Main Account');
    expect(screen.getByText(/Account Number:/i).nextSibling?.textContent).toBe('123456');

    // Click again to collapse
    fireEvent.click(firstRow);
    expect(screen.queryByText(/Transaction Details/i)).not.toBeInTheDocument();
  });

  it('toggles transaction details when Enter or Space key pressed on row', () => {
    render(<TransactionsTable transactions={mockTransactions} />);

    const secondRow = screen.getAllByRole('button')[1];

    // Press Enter key
    fireEvent.keyDown(secondRow, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(screen.getByText(/Transaction Details/i)).toBeInTheDocument();

    // Press Space key to collapse
    fireEvent.keyDown(secondRow, { key: ' ', code: 'Space', charCode: 32 });
    expect(screen.queryByText(/Transaction Details/i)).not.toBeInTheDocument();
  });

  it('displays "N/A" for missing transaction details', () => {
    render(<TransactionsTable transactions={mockTransactions} />);

    // Expand second transaction which has null details
    const secondRow = screen.getAllByRole('button')[1];
    fireEvent.click(secondRow);

    expect(screen.getByText(/Account Name:/i).nextSibling?.textContent).toBe('N/A');
    expect(screen.getByText(/Account Number:/i).nextSibling?.textContent).toBe('N/A');
    expect(screen.getByText(/Market Place:/i).nextSibling?.textContent).toBe('N/A');
    expect(screen.getByText(/Security:/i).nextSibling?.textContent).toBe('N/A');
  });
});
