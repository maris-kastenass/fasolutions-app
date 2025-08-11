import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import ContactsData from './ContactsData';
import { GET_CONTACTS } from '../../graphql/getContacts';

// Mock ContactsDisplay to easily inspect props
jest.mock('../ContactsDisplay/ContactsDisplay', () => {
  return jest.fn(({ contacts, loading, error }) => (
    <div>
      <div data-testid="contacts">{JSON.stringify(contacts)}</div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="error">{error ? 'true' : 'false'}</div>
    </div>
  ));
});

// Mock useQuery and gql from Apollo
jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    gql: (strings: TemplateStringsArray) => strings[0], // simple passthrough
    useQuery: jest.fn(),
  };
});

const mockedUseQuery = useQuery as jest.Mock;

describe('ContactsData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('passes loading state to ContactsDisplay', () => {
    mockedUseQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    });

    render(<ContactsData />);

    expect(screen.getByTestId('loading').textContent).toBe('true');
    expect(screen.getByTestId('contacts').textContent).toBe('[]');
    expect(screen.getByTestId('error').textContent).toBe('false');

    expect(mockedUseQuery).toHaveBeenCalledWith(GET_CONTACTS);
  });

  it('passes error state to ContactsDisplay', () => {
    const errorObj = new Error('GraphQL Error');
    mockedUseQuery.mockReturnValue({
      loading: false,
      error: errorObj,
      data: undefined,
    });

    render(<ContactsData />);

    expect(screen.getByTestId('error').textContent).toBe('true');
    expect(screen.getByTestId('contacts').textContent).toBe('[]');
    expect(screen.getByTestId('loading').textContent).toBe('false');
  });

  it('passes data state to ContactsDisplay', () => {
    const mockContacts = [{ id: '1', name: 'Maris Kastenass' }];
    mockedUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { contactsByParameters: mockContacts },
    });

    render(<ContactsData />);

    expect(screen.getByTestId('contacts').textContent).toBe(JSON.stringify(mockContacts));
    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('false');
  });
});
