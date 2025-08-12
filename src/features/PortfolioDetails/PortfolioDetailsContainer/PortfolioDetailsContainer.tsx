import './PortfolioDetailsContainer.css';

import type { PortfolioDetails } from '../../../types/portfolioDetails';
import type { PortfolioDetailsContainerProps } from './PortfolioDetailsContainer.types';

const PortfolioDetailsContainer = ({
  portfolioDetails,
  setSelectedPortfolioId,
}: PortfolioDetailsContainerProps) => {
  const showTransactions = (portfolioId: number) => {
    setSelectedPortfolioId(portfolioId);
  };

  const getTwrClassName = (value?: number | null) =>
    value && value > 0 ? 'card-green-text' : 'card-red-text';

  return (
    <div className="row justify-content-md-center">
      {portfolioDetails.map((portfolio: PortfolioDetails) => (
        <div key={portfolio.id} className="col-md-6 col-xl-4 mb-3 mb-sm-0">
          <div className="card shadow m-3">
            <div className="card-body">
              <h5 className="card-title">{portfolio.name}</h5>
              <p className="card-text">
                <span className="pe-2">M1 TWR:</span>
                <span className={getTwrClassName(portfolio.analytics?.grouppedAnalytics?.M1?.twr)}>
                  {portfolio.analytics?.grouppedAnalytics?.M1?.twr ?? 'No data found'}
                </span>
              </p>
              <p className="card-text">
                <span className="pe-2">M2 TWR:</span>
                <span className={getTwrClassName(portfolio.analytics?.grouppedAnalytics?.M2?.twr)}>
                  {portfolio.analytics?.grouppedAnalytics?.M2?.twr ?? 'No data found'}
                </span>
              </p>
              <button
                className="btn btn-outline-secondary"
                onClick={() => showTransactions(portfolio.id)}
                aria-label={`View transactions for portfolio ${portfolio.name}`}
              >
                Transactions
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioDetailsContainer;
