import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_PORTFOLIO_TRANSACTIONS } from '../../graphql/getTransactions';
import BackButton from '../BackButton/BackButton';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import TransactionDateFilter from '../TransactionDateFilter/TransactionDateFilter';
import Pagination from '../Pagination/Pagination';

import type {
  GetPortfolioTransactionsResponse,
  GetPortfolioDetailsVariables,
} from '../../types/transactions';
import type { PortfolioTransactionsProps } from './PortfolioTransactions.types';

const ITEMS_PER_PAGE = 20;

const PortfolioTransactions = ({
  portfolioId,
  setSelectedPortfolioId,
}: PortfolioTransactionsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const today = new Date().toISOString().slice(0, 10);
  // start date is 5 years before today
  const defaultStartDate = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(today);

  const [fetchTransactions, { data, loading, error }] = useLazyQuery<
    GetPortfolioTransactionsResponse,
    GetPortfolioDetailsVariables
  >(GET_PORTFOLIO_TRANSACTIONS);

  const handleLoadTransactions = () => {
    fetchTransactions({
      variables: {
        ids: [portfolioId],
        startDate,
        endDate,
      },
    });
    // reset to first page on new search
    setCurrentPage(1);
  };

  // Call query once on mount
  useEffect(() => {
    handleLoadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="text-center mt-4">Loading portfolio details...</div>;
  if (error) return <div className="text-danger mt-4">Error: {error.message}</div>;
  if (!data) return <div className="text-muted mt-4">No Portfolio Transactions found</div>;

  const transactions = data?.portfoliosByIds[0]?.transactions ?? [];

  // total page count
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  // get transactions to show in current page
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleBackClick = () => setSelectedPortfolioId(null);

  return (
    <div>
      <BackButton onClick={handleBackClick} />
      <h4 className="mt-3">Portfolios Transactions</h4>
      <TransactionDateFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleLoadTransactions={handleLoadTransactions}
      />
      <div className="p-3">
        <TransactionsTable transactions={paginatedTransactions} />
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PortfolioTransactions;
