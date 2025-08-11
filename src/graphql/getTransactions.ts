import { gql } from '@apollo/client';

export const GET_PORTFOLIO_TRANSACTIONS = gql`
  query Transactions($ids: [Long], $startDate: String, $endDate: String) {
    portfoliosByIds(ids: $ids) {
      transactions(status: "OK", startDate: $startDate, endDate: $endDate) {
        id
        typeName
        transactionDate
        security {
          name
        }
        marketPlaceCode
        marketPlace {
          name
        }
        account {
          name
          number
        }
        quantity: amount
        unitPrice: unitPriceView
        tradeAmount
        currencyCode
      }
    }
  }
`;
