import { gql } from '@apollo/client';

export const GET_PORTFOLIO_DETAILS = gql`
  query GetPortfolioDetails($ids: [Long]!) {
    portfoliosByIds(ids: $ids) {
      id
      name
      analytics(
        parameters: {
          paramsSet: {
            key: "A"
            timePeriodCodes: ["MONTHS-1", "MONTHS-2"]
            grouppedByProperties: [PORTFOLIO]
          }
        }
      ) {
        grouppedAnalytics(key: "A") {
          M1: analysis(timePeriodCode: "MONTHS-1") {
            twr
          }
          M2: analysis(timePeriodCode: "MONTHS-2") {
            twr
          }
        }
      }
    }
  }
`;
