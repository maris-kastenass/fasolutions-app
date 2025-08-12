import './App.css';
import type { KeycloakInstance } from 'keycloak-js';
import ContactsData from './features/Contacts/ContactsData/ContactsData';
import AppHeader from './components/AppHeader/AppHeader';

type AppProps = {
  keycloak: KeycloakInstance;
};

const TITLE = 'Investor data';

const App = ({ keycloak }: AppProps) => {
  const logout = () => {
    keycloak.logout();
  };

  return (
    <div className="App">
      <AppHeader title={TITLE} logout={logout} />
      <ContactsData />
    </div>
  );
};

export default App;
