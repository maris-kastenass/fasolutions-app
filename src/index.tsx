import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apollo/apolloClient';
import 'bootstrap/dist/css/bootstrap.min.css';

keycloak
  .init({ onLoad: 'login-required', checkLoginIframe: false })
  .then((authenticated: boolean) => {
    if (authenticated) {
      const client = createApolloClient(keycloak);
      const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
      root.render(
        <React.StrictMode>
          <ApolloProvider client={client}>
            <App keycloak={keycloak} />
          </ApolloProvider>
        </React.StrictMode>
      );
    } else {
      keycloak.clearToken();
      keycloak.logout();
      sessionStorage.clear();
    }
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Keycloak initialization error:', error.message);
    } else {
      console.error('Unknown error during Keycloak init', error);
    }
  });

reportWebVitals();
