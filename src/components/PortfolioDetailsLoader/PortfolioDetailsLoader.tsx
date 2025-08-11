import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO_DETAILS } from '../../graphql/getPortfolio';
import PortfolioDetailsDisplay from '../PortfolioDetailsDisplay/PortfolioDetailsDisplay';

import type { PortfolioDetailsLoaderProps } from './PortfolioDetailsLoader.types';
import type {
  GetPortfolioDetailsResponse,
  GetPortfolioDetailsVars,
} from '../../types/portfolioDetails';

const PortfolioDetailsLoader = ({ contact, setSelectedContact }: PortfolioDetailsLoaderProps) => {
  useEffect(() => {
    // if refresh page and no cantact selected then return to contact list
    if (!contact) {
      setSelectedContact(null);
    }
  }, [contact, setSelectedContact]);

  const { loading, error, data } = useQuery<GetPortfolioDetailsResponse, GetPortfolioDetailsVars>(
    GET_PORTFOLIO_DETAILS,
    {
      variables: { ids: contact?.portfolios.map(portfolio => portfolio.id) || [] },
      skip: !contact,
    }
  );

  if (!contact) return null;

  return (
    <PortfolioDetailsDisplay
      loading={loading}
      error={error}
      portfolioDetails={data?.portfoliosByIds}
      setSelectedContact={setSelectedContact}
      contactName={contact?.name}
    />
  );
};

export default PortfolioDetailsLoader;
