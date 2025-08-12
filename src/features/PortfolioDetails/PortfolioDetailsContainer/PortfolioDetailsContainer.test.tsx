import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioDetailsContainer from './PortfolioDetailsContainer';

const mockSetSelectedPortfolioId = jest.fn();

const portfolioDetailsMock = [
  {
    id: 1,
    name: 'Portfolio 1',
    analytics: {
      grouppedAnalytics: {
        M1: { twr: 0.05 },
        M2: { twr: -0.02 },
      },
    },
  },
  {
    id: 2,
    name: 'Portfolio 2',
    analytics: {
      grouppedAnalytics: {
        M1: { twr: null },
        M2: { twr: 0 },
      },
    },
  },
];

describe('PortfolioDetailsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders portfolio names and TWR values correctly', () => {
    render(
      <PortfolioDetailsContainer
        portfolioDetails={portfolioDetailsMock}
        setSelectedPortfolioId={mockSetSelectedPortfolioId}
      />
    );

    // Check portfolio names
    expect(screen.getByText('Portfolio 1')).toBeInTheDocument();
    expect(screen.getByText('Portfolio 2')).toBeInTheDocument();

    // Check TWR values and fallback text
    expect(screen.getByText('0.05')).toBeInTheDocument();
    expect(screen.getByText('-0.02')).toBeInTheDocument();

    expect(screen.getAllByText('No data found').length).toBeGreaterThanOrEqual(1);
  });

  it('applies correct CSS classes based on TWR values', () => {
    render(
      <PortfolioDetailsContainer
        portfolioDetails={portfolioDetailsMock}
        setSelectedPortfolioId={mockSetSelectedPortfolioId}
      />
    );

    const greenText = screen.getByText('0.05');
    const redText = screen.getByText('-0.02');

    expect(greenText).toHaveClass('card-green-text');
    expect(redText).toHaveClass('card-red-text');
  });

  it('calls setSelectedPortfolioId when Transactions button is clicked', () => {
    render(
      <PortfolioDetailsContainer
        portfolioDetails={portfolioDetailsMock}
        setSelectedPortfolioId={mockSetSelectedPortfolioId}
      />
    );

    const button = screen.getByRole('button', {
      name: /View transactions for portfolio Portfolio 1/i,
    });
    fireEvent.click(button);

    expect(mockSetSelectedPortfolioId).toHaveBeenCalledWith(1);
  });
});
