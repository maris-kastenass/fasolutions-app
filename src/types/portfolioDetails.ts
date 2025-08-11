export type PortfolioDetails = {
  id: number;
  name: string;
  analytics: {
    grouppedAnalytics: {
      M1: { twr: number | null } | null;
      M2: { twr: number | null } | null;
    };
  };
};

export type GetPortfolioDetailsResponse = {
  portfoliosByIds: PortfolioDetails[];
};

export type GetPortfolioDetailsVars = {
  ids: string[];
};
