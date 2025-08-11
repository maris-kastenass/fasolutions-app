import './AppHeader.css';
import type { AppHeaderProps } from './AppHeader.types';

const AppHeader = ({ title, logout }: AppHeaderProps) => {
  return (
    <header className="App-header">
      <div className="header-left"></div>
      <h3 className="mb-0">{title}</h3>
      <div className="header-right mb-0">
        <button
          type="button"
          className="btn btn-light"
          onClick={logout}
          aria-label="Log out of your account"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
