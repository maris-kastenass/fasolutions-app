// Portfolio type
export type Portfolio = {
  id: string;
  name: string;
};

// Contact type
export type Contact = {
  id: string;
  name: string;
  portfolios: Portfolio[];
};

export type GetContactsResponse = {
  contactsByParameters: Contact[];
};
