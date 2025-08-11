import './BackButton.css';
import type { BackButtonProps } from './BackButton.types';

const BackButton = ({ onClick, label = 'Back' }: BackButtonProps) => {
  return (
    <button
      type="button"
      className="btn btn-secondary back-button"
      onClick={onClick}
      aria-label="Go back"
    >
      {label}
    </button>
  );
};

export default BackButton;
