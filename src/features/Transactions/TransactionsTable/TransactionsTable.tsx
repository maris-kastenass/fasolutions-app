import React, { useState } from 'react';
import './TransactionsTable.css';

import type { Transactions } from '../../../types/transactions';
import type { TransactionsTableProps } from './TransactionsTable.types';

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  // after row click shows additional transaction info
  const handleRowClick = (transactionId: number) => {
    setExpandedRowId(prevId => (prevId === transactionId ? null : transactionId));
  };

  const handleKeyDown = (id: number) => (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick(id);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Currency</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction: Transactions) => (
              <React.Fragment key={transaction.id}>
                <tr
                  className="transaction-row"
                  onClick={() => handleRowClick(transaction.id)}
                  tabIndex={0}
                  onKeyDown={handleKeyDown(transaction.id)}
                  role="button"
                  aria-expanded={expandedRowId === transaction.id}
                >
                  <td>{transaction.id}</td>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.tradeAmount.toFixed(2)}</td>
                  <td>{transaction.currencyCode}</td>
                  <td>{transaction.typeName}</td>
                </tr>
                {expandedRowId === transaction.id && (
                  <tr>
                    <td colSpan={5}>
                      <div className="card container-sm">
                        <div className="card-body">
                          <h5 className="card-title mb-4">Transaction Details</h5>
                          <dl className="row mb-0">
                            <dt className="col-sm-5">Account Name:</dt>
                            <dd className="col-sm-7">{transaction?.account?.name || 'N/A'}</dd>
                            <dt className="col-sm-5">Account Number:</dt>
                            <dd className="col-sm-7">{transaction?.account?.number || 'N/A'}</dd>
                            <dt className="col-sm-5">Market Place:</dt>
                            <dd className="col-sm-7">{transaction?.marketPlace?.name || 'N/A'}</dd>
                            <dt className="col-sm-5">Security:</dt>
                            <dd className="col-sm-7">{transaction?.security?.name || 'N/A'}</dd>
                            <dt className="col-sm-5">Unit Price:</dt>
                            <dd className="col-sm-7">
                              {transaction.unitPrice != null
                                ? transaction.unitPrice.toFixed(2)
                                : 'N/A'}
                            </dd>
                            <dt className="col-sm-5">Quantity:</dt>
                            <dd className="col-sm-7">{transaction.quantity || 'N/A'}</dd>
                          </dl>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
