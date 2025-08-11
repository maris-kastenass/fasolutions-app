import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://tryme.fasolutions.com/auth',
  realm: 'fa',
  clientId: 'external-api',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
