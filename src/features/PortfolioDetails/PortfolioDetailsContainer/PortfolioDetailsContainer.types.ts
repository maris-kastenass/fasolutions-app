import type { PortfolioDetails } from '../../../types/portfolioDetails';

export type PortfolioDetailsContainerProps = {
  portfolioDetails: PortfolioDetails[];
  setSelectedPortfolioId: React.Dispatch<React.SetStateAction<number | null>>;
};
