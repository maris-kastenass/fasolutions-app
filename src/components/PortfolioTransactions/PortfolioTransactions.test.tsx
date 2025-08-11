import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import PortfolioTransactions from './PortfolioTransactions';

// Mock child components
jest.mock('../BackButton/BackButton', () => (props: any) => (
  <button onClick={props.onClick}>BackButton</button>
));
jest.mock('../TransactionDateFilter/TransactionDateFilter', () => (props: any) => (
  <button onClick={props.handleLoadTransactions}>Load Transactions</button>
));
jest.mock('../TransactionsTable/TransactionsTable', () => (props: any) => (
  <div>TransactionsTable with {props.transactions.length} items</div>
));
jest.mock('../Pagination/Pagination', () => (props: any) => (
  <div>
    Pagination current: {props.currentPage} total: {props.totalPages}
    <button onClick={() => props.onPageChange(props.currentPage + 1)}>Next</button>
  </div>
));

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useLazyQuery: jest.fn(),
  };
});

const mockUseLazyQuery = useLazyQuery as jest.Mock;

describe('PortfolioTransactions', () => {
  const portfolioId = 777;
  const setSelectedPortfolioId = jest.fn();

  const mockTransactions = Array.from({ length: 25 }).map((_, i) => ({
    id: i + 1,
    transactionDate: '2023-07-01',
    tradeAmount: 100 + i,
    currencyCode: 'USD',
    typeName: 'Buy',
    account: { name: 'Account', number: '123' },
    marketPlace: { name: 'NYSE' },
    security: { name: 'Security' },
    unitPrice: 10,
    quantity: 5,
  }));

  it('should render loading state initially', () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { data: undefined, loading: true, error: undefined },
    ]);

    render(
      <PortfolioTransactions
        portfolioId={portfolioId}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    );

    expect(screen.getByText(/Loading portfolio details/i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { data: undefined, loading: false, error: { message: 'Oops!' } },
    ]);

    render(
      <PortfolioTransactions
        portfolioId={portfolioId}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    );

    expect(screen.getByText(/error: oops!/i)).toBeInTheDocument();
  });

  it('should render no data state', () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      { data: undefined, loading: false, error: undefined },
    ]);

    render(
      <PortfolioTransactions
        portfolioId={portfolioId}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    );

    expect(screen.getByText(/no portfolio transactions found/i)).toBeInTheDocument();
  });

  it('should render transactions and paginate', async () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      {
        data: {
          portfoliosByIds: [
            {
              transactions: mockTransactions,
            },
          ],
        },
        loading: false,
        error: undefined,
      },
    ]);

    render(
      <PortfolioTransactions
        portfolioId={portfolioId}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    );

    // Should render first 20 items
    expect(screen.getByText(/transactionsTable with 20 items/i)).toBeInTheDocument();

    // Should render pagination
    expect(screen.getByText(/pagination current: 1 total: 2/i)).toBeInTheDocument();

    // Click next page button
    fireEvent.click(screen.getByText(/next/i));

    // After clicking next page, TransactionsTable should show 5 items (25 - 20)
    await waitFor(() =>
      expect(screen.getByText(/transactionsTable with 5 items/i)).toBeInTheDocument()
    );
  });

  it('should call setSelectedPortfolioId on back button click', () => {
    mockUseLazyQuery.mockReturnValue([
      jest.fn(),
      {
        data: {
          portfoliosByIds: [
            {
              transactions: [],
            },
          ],
        },
        loading: false,
        error: undefined,
      },
    ]);

    render(
      <PortfolioTransactions
        portfolioId={portfolioId}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    );

    fireEvent.click(screen.getByText(/backbutton/i));

    expect(setSelectedPortfolioId).toHaveBeenCalledWith(null);
  });
});
