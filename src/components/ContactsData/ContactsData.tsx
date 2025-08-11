import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from '../../graphql/getContacts';
import ContactsDisplay from '../ContactsDisplay/ContactsDisplay';

import type { GetContactsResponse } from '../../types/contact';

const ContactsData = () => {
  const { loading, error, data } = useQuery<GetContactsResponse>(GET_CONTACTS);

  return (
    <ContactsDisplay contacts={data?.contactsByParameters ?? []} loading={loading} error={error} />
  );
};

export default ContactsData;
