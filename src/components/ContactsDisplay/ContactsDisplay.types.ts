import type { Contact } from '../../types/contact';
import { ApolloError } from '@apollo/client';

export type ContactsDisplayProps = {
  contacts: Contact[] | null;
  loading: boolean;
  error?: ApolloError;
};
