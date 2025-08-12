import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import PortfolioDetailsLoader from './PortfolioDetailsLoader';

// Mock the PortfolioDetailsDisplay component to isolate testing
jest.mock('../PortfolioDetailsDisplay/PortfolioDetailsDisplay', () => (props: any) => {
  return (
    <div data-testid="PortfolioDetailsDisplay">
      Loading: {props.loading ? 'true' : 'false'}, Error: {props.error ? 'true' : 'false'},
      ContactName: {props.contactName}
    </div>
  );
});

// Mock useQuery
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

describe('PortfolioDetailsLoader', () => {
  const setSelectedContact = jest.fn();

  const mockContact = {
    id: '777',
    name: 'Maris Kastenass',
    portfolios: [
      { id: 'p1', name: 'Portfolio 1' },
      { id: 'p2', name: 'Portfolio 2' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock returns a safe empty query result, so destructuring never fails
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: null,
    });
  });

  it('renders null if no contact is provided', () => {
    const { container } = render(
      <PortfolioDetailsLoader contact={null} setSelectedContact={setSelectedContact} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('calls setSelectedContact(null) in useEffect if no contact', () => {
    // We'll render with contact=null, and check if setSelectedContact was called
    render(<PortfolioDetailsLoader contact={null} setSelectedContact={setSelectedContact} />);
    expect(setSelectedContact).toHaveBeenCalledWith(null);
  });

  it('calls useQuery with proper variables when contact is provided', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: { portfoliosByIds: [{ id: 'p1', name: 'Portfolio 1' }] },
    });

    render(
      <PortfolioDetailsLoader contact={mockContact} setSelectedContact={setSelectedContact} />
    );

    expect(useQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        variables: { ids: ['p1', 'p2'] },
        skip: false,
      })
    );

    // PortfolioDetailsDisplay should be rendered with expected props
    const display = screen.getByTestId('PortfolioDetailsDisplay');
    expect(display).toHaveTextContent('Loading: false');
    expect(display).toHaveTextContent('Error: false');
    expect(display).toHaveTextContent('ContactName: Maris Kastenass');
  });

  it('sets skip to true in useQuery when contact is null', () => {
    const mockContact = null;
    render(
      <PortfolioDetailsLoader contact={mockContact} setSelectedContact={setSelectedContact} />
    );

    // useQuery should be called, but with skip: true
    expect(useQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        skip: true,
      })
    );
  });

  it('passes loading and error states from useQuery to PortfolioDetailsDisplay', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: new Error('Something went wrong'),
      data: null,
    });

    render(
      <PortfolioDetailsLoader contact={mockContact} setSelectedContact={setSelectedContact} />
    );

    const display = screen.getByTestId('PortfolioDetailsDisplay');
    expect(display).toHaveTextContent('Loading: true');
    expect(display).toHaveTextContent('Error: true');
    expect(display).toHaveTextContent('ContactName: Maris Kastenass');
  });
});
