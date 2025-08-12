import './TransactionDateFilter.css';

import type { TransactionDateFilterProps } from './TransactionDateFilter.types';

const TransactionDateFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleLoadTransactions,
}: TransactionDateFilterProps) => {
  return (
    <div className="search-container mb-3 d-sm-flex gap-3 align-items-end">
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mt-2 mt-sm-0"
        onClick={handleLoadTransactions}
        disabled={!startDate || !endDate}
      >
        Load Transactions
      </button>
    </div>
  );
};

export default TransactionDateFilter;
