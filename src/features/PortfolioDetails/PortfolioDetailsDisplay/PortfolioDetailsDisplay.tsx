import './PortfolioDetailsDisplay.css';
import { useState } from 'react';
import PortfolioTransactions from '../../Transactions/PortfolioTransactions/PortfolioTransactions';
import PortfolioDetailsContainer from '../PortfolioDetailsContainer/PortfolioDetailsContainer';
import BackButton from '../../../components/BackButton/BackButton';

import type { PortfolioDetailsDisplayProps } from './PortfolioDetailsDisplay.types';

const PortfolioDetailsDisplay = ({
  loading,
  error,
  portfolioDetails,
  contactName,
  setSelectedContact,
}: PortfolioDetailsDisplayProps) => {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);

  if (loading) return <div className="text-center mt-4">Loading portfolio details...</div>;
  if (error) return <div className="text-danger mt-4">Error: {error.message}</div>;
  if (!portfolioDetails || portfolioDetails.length === 0) {
    return <div className="text-muted mt-4">No Portfolio Details found.</div>;
  }

  if (selectedPortfolioId) {
    return (
      <PortfolioTransactions
        portfolioId={selectedPortfolioId}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    );
  }

  const handleBackClick = () => setSelectedContact(null);

  return (
    <div>
      <BackButton onClick={handleBackClick} />
      <h2 className="mt-3">Portfolio Details{contactName ? ` for ${contactName}` : ''}</h2>
      <PortfolioDetailsContainer
        portfolioDetails={portfolioDetails}
        setSelectedPortfolioId={setSelectedPortfolioId}
      />
    </div>
  );
};

export default PortfolioDetailsDisplay;
