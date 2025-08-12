import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the child components
jest.mock('./components/AppHeader/AppHeader', () => (props: any) => (
  <div>
    <h1>{props.title}</h1>
    <button onClick={props.logout}>Logout</button>
  </div>
));
jest.mock('./features/Contacts/ContactsData/ContactsData', () => () => (
  <div>ContactsData Component</div>
));

describe('App', () => {
  it('renders title and ContactsData, and calls logout on button click', () => {
    const logoutMock = jest.fn();
    const keycloakMock = {
      logout: logoutMock,
    };

    render(<App keycloak={keycloakMock as any} />);

    // Check title
    expect(screen.getByText('Investor data')).toBeInTheDocument();

    // Check ContactsData presence
    expect(screen.getByText('ContactsData Component')).toBeInTheDocument();

    // Click logout button
    fireEvent.click(screen.getByText('Logout'));

    // logout should be called
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
