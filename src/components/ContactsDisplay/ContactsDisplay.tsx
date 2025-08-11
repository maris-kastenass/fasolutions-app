import { useState } from 'react';
import PortfolioDetailsLoader from '../PortfolioDetailsLoader/PortfolioDetailsLoader';
import Pagination from '../Pagination/Pagination';
import './ContactsDisplay.css';

import type { Contact } from '../../types/contact';
import type { ContactsDisplayProps } from './ContactsDisplay.types';

const ITEMS_PER_PAGE = 20;

const ContactsDisplay = ({ contacts, loading, error }: ContactsDisplayProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <div className="text-center mt-4">Loading portfolio details...</div>;
  if (error) return <div className="text-danger mt-4">Error: {error.message}</div>;
  if (!contacts) return <div className="text-muted mt-4">No contacts found</div>;

  // after click on Contact shows Portfolio Details
  if (selectedContact) {
    return (
      <PortfolioDetailsLoader contact={selectedContact} setSelectedContact={setSelectedContact} />
    );
  }

  // total page count
  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);

  // get contacts to show in current page
  const paginatedContacts = contacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="contacts ms-auto me-auto">
      <div className="row">
        <h4 className="col-8">Name</h4>
        <h4 className="col-4">Portfolios count</h4>
      </div>
      <div className="list-group">
        {paginatedContacts.map((contact: Contact) => (
          <button
            key={contact.id}
            type="button"
            className="list-group-item list-group-item-action list-group-item-secondary"
            onClick={() => setSelectedContact(contact)}
          >
            <div className="row">
              <h5 className="col-8 mb-1 mt-1">{contact.name}</h5>
              <h5 className="col-4 mb-1 mt-1">{contact.portfolios.length}</h5>
            </div>
          </button>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ContactsDisplay;
