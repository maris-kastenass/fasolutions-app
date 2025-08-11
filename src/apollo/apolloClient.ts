import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { KeycloakInstance } from 'keycloak-js';

const createApolloClient = (keycloak: KeycloakInstance) => {
  const httpLink = new HttpLink({
    uri: 'https://tryme.fasolutions.com/graphql',
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      await keycloak.updateToken(30);
    } catch (err) {
      keycloak.logout();
    }

    if (!keycloak.token) {
      throw new Error('No token available');
    }

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${keycloak.token}`,
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
