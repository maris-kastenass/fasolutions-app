import type { PortfolioDetails } from '../../../types/portfolioDetails';
import { ApolloError } from '@apollo/client';
import type { Contact } from '../../../types/contact';

export type PortfolioDetailsDisplayProps = {
  loading: boolean;
  error?: ApolloError;
  portfolioDetails: PortfolioDetails[] | undefined;
  contactName: string | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
};
