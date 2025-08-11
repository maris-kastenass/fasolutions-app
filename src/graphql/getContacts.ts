import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query {
    contactsByParameters(parameters: { status: "A" }) {
      id
      name
      portfolios {
        id
        name
      }
    }
  }
`;
