import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsDisplay from './ContactsDisplay';
import { ApolloError } from '@apollo/client';

jest.mock(
  '../../PortfolioDetails/PortfolioDetailsLoader/PortfolioDetailsLoader',
  () => (props: any) => (
    <div data-testid="portfolio-details-loader">
      PortfolioDetailsLoader for {props.contact?.name}
      <button onClick={() => props.setSelectedContact(null)}>Back</button>
    </div>
  )
);

jest.mock('../../../components/Pagination/Pagination', () => (props: any) => (
  <div>
    Pagination current: {props.currentPage} total: {props.totalPages}
    <button onClick={() => props.onPageChange(props.currentPage + 1)}>Next</button>
  </div>
));

const contactsMock = Array.from({ length: 25 }).map((_, i) => ({
  id: `id ${i + 1}`,
  name: `Contact ${i + 1}`,
  portfolios: new Array((i % 3) + 1).fill(null),
}));

describe('ContactsDisplay', () => {
  it('shows loading state', () => {
    render(<ContactsDisplay contacts={[]} loading={true} error={undefined} />);
    expect(screen.getByText(/Loading portfolio details/i)).toBeInTheDocument();
  });

  it('shows error message', () => {
    const error = new ApolloError({ errorMessage: 'Test error' });
    render(<ContactsDisplay contacts={[]} loading={false} error={error} />);
    expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();
  });

  it('shows no contacts message', () => {
    render(<ContactsDisplay contacts={null} loading={false} error={undefined} />);
    expect(screen.getByText(/No contacts found/i)).toBeInTheDocument();
  });

  it('renders paginated contacts and handles contact selection', () => {
    render(<ContactsDisplay contacts={contactsMock} loading={false} error={undefined} />);

    // Should show first 20 contacts (items per page)
    for (let i = 1; i <= 20; i++) {
      expect(screen.getByText(`Contact ${i}`)).toBeInTheDocument();
    }
    // Should NOT show contact 21 on first page
    expect(screen.queryByText('Contact 21')).not.toBeInTheDocument();

    // Click a contact to select it
    fireEvent.click(screen.getByText('Contact 3'));
    expect(screen.getByTestId('portfolio-details-loader')).toHaveTextContent(
      'PortfolioDetailsLoader for Contact 3'
    );

    // Click Back button inside PortfolioDetailsLoader to deselect
    fireEvent.click(screen.getByText('Back'));
    expect(screen.queryByTestId('portfolio-details-loader')).not.toBeInTheDocument();

    // The contact list is visible again
    expect(screen.getByText('Contact 1')).toBeInTheDocument();
  });

  it('handles pagination button clicks', () => {
    render(<ContactsDisplay contacts={contactsMock} loading={false} error={undefined} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Now page 2 contacts should be visible
    expect(screen.getByText('Contact 21')).toBeInTheDocument();
    expect(screen.queryByText('Contact 1')).not.toBeInTheDocument();
  });
});
