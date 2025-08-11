import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackButton from './BackButton';
import type { BackButtonProps } from './BackButton.types';

describe('BackButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps: BackButtonProps = {
    onClick: mockOnClick,
    label: undefined, // will use default 'Back'
  };

  it('renders the button with default label', () => {
    render(<BackButton {...defaultProps} />);
    const button = screen.getByRole('button', { name: /go back/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back');
  });

  it('renders the button with a custom label', () => {
    render(<BackButton {...defaultProps} label="Return" />);
    const button = screen.getByRole('button', { name: /go back/i });
    expect(button).toHaveTextContent('Return');
  });

  it('calls onClick handler when clicked', () => {
    render(<BackButton {...defaultProps} />);
    const button = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
