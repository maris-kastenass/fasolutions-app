export type Transactions = {
  id: number;
  typeName: string;
  transactionDate: string;
  security?: {
    name: string;
  };
  marketPlaceCode?: string;
  marketPlace?: {
    name: string;
  };
  account?: {
    name: string;
    number: string;
  };
  quantity: number;
  unitPrice: number;
  tradeAmount: number;
  currencyCode: string;
};

export type GetPortfolioTransactionsResponse = {
  portfoliosByIds: {
    transactions: Transactions[];
  }[];
};

export type GetPortfolioDetailsVariables = {
  ids?: number[];
  startDate?: string;
  endDate?: string;
};
