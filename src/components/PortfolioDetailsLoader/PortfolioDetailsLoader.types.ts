import type { Contact } from '../../types/contact';

export type PortfolioDetailsLoaderProps = {
  contact: Contact;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
};
