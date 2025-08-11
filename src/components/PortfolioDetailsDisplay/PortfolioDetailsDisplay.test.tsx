import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioDetailsDisplay from './PortfolioDetailsDisplay';
import { ApolloError } from '@apollo/client';

jest.mock('../PortfolioTransactions/PortfolioTransactions', () => (props: any) => (
  <div data-testid="portfolio-transactions">
    PortfolioTransactions - portfolioId: {props.portfolioId}
    <button onClick={() => props.setSelectedPortfolioId(null)}>Close Transactions</button>
  </div>
));

jest.mock('../PortfolioDetailsContainer/PortfolioDetailsContainer', () => (props: any) => (
  <div data-testid="portfolio-details-container">
    PortfolioDetailsContainer
    <button onClick={() => props.setSelectedPortfolioId(123)}>Select Portfolio 123</button>
  </div>
));

jest.mock('../BackButton/BackButton', () => (props: any) => (
  <button onClick={props.onClick}>BackButton</button>
));

describe('PortfolioDetailsDisplay', () => {
  const defaultProps = {
    loading: false,
    error: undefined,
    portfolioDetails: [
      {
        id: 1,
        name: 'Portfolio 1',
        analytics: { grouppedAnalytics: { M1: { twr: null }, M2: { twr: null } } },
      },
    ],
    contactName: 'Maris Kastenass',
    setSelectedContact: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    render(<PortfolioDetailsDisplay {...defaultProps} loading={true} />);
    expect(screen.getByText(/Loading portfolio details/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = new ApolloError({ errorMessage: 'Error occurred' });
    render(<PortfolioDetailsDisplay {...defaultProps} error={error} />);
    expect(screen.getByText(/Error: Error occurred/i)).toBeInTheDocument();
  });

  it('renders no portfolio details found when empty', () => {
    render(<PortfolioDetailsDisplay {...defaultProps} portfolioDetails={[]} />);
    expect(screen.getByText(/No Portfolio Details found/i)).toBeInTheDocument();
  });

  it('renders portfolio details container and back button', () => {
    render(<PortfolioDetailsDisplay {...defaultProps} />);
    expect(screen.getByText(/Portfolio Details for Maris Kastenass/i)).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-details-container')).toBeInTheDocument();
    expect(screen.getByText('BackButton')).toBeInTheDocument();
  });

  it('calls setSelectedContact(null) when back button clicked', () => {
    render(<PortfolioDetailsDisplay {...defaultProps} />);
    fireEvent.click(screen.getByText('BackButton'));
    expect(defaultProps.setSelectedContact).toHaveBeenCalledWith(null);
  });

  it('shows PortfolioTransactions when a portfolio is selected', () => {
    render(<PortfolioDetailsDisplay {...defaultProps} />);
    // select a portfolio by clicking button inside PortfolioDetailsContainer mock
    fireEvent.click(screen.getByText('Select Portfolio 123'));
    expect(screen.getByTestId('portfolio-transactions')).toHaveTextContent('portfolioId: 123');

    // close transactions
    fireEvent.click(screen.getByText('Close Transactions'));
    expect(screen.queryByTestId('portfolio-transactions')).not.toBeInTheDocument();
    expect(screen.getByTestId('portfolio-details-container')).toBeInTheDocument();
  });
});
