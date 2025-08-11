import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from './AppHeader';
import type { AppHeaderProps } from './AppHeader.types';

describe('AppHeader', () => {
  const mockLogout = jest.fn();

  const defaultProps: AppHeaderProps = {
    title: 'Dashboard',
    logout: mockLogout,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with the given title', () => {
    render(<AppHeader {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Dashboard');
  });

  it('renders the logout button with correct label', () => {
    render(<AppHeader {...defaultProps} />);
    const button = screen.getByRole('button', { name: /log out of your account/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Logout');
  });

  it('calls the logout function when button is clicked', () => {
    render(<AppHeader {...defaultProps} />);
    const button = screen.getByRole('button', { name: /log out of your account/i });
    fireEvent.click(button);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
