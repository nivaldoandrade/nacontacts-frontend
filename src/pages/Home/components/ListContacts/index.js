import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { memo } from 'react';
import arrowIcon from '../../../../assets/icons/arrow.svg';
import editIcon from '../../../../assets/icons/edit.svg';
import deleteIcon from '../../../../assets/icons/delete.svg';

import { Container, Card } from './styles';

function ListContactsMemo({
  orderByName,
  filteredContacts,
  onToggleOrderByName,
  onDeleteContact
}) {
  console.log(filteredContacts);

  return (
    <Container orderByName={orderByName}>
      {filteredContacts.length > 0 && (
        <header>
          <button type="button" onClick={onToggleOrderByName}>
            <span>Nome</span>
            <img src={arrowIcon} alt="Arrow" />
          </button>
        </header>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="info-header">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phoneFormatted}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={editIcon} alt="Edit" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={deleteIcon} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

ListContactsMemo.propTypes = {
  orderByName: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phoneFormatted: PropTypes.string,
      phone: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string
      })
    }).isRequired
  ).isRequired,
  onToggleOrderByName: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export const ListContacts = memo(ListContactsMemo);
