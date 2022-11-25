/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export function Header({ hasError, qtyContacts, qtyFilteredContacts }) {
  return (
    <Container
      hasError={hasError}
      justifyContent={
        hasError ? 'flex-end' : qtyContacts > 0 ? 'space-between' : 'center'
      }
    >
      {!hasError && qtyContacts > 0 && (
        <strong>
          {qtyFilteredContacts}{' '}
          {qtyFilteredContacts === 1 ? 'contato' : 'contatos'}
        </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyContacts: PropTypes.number.isRequired,
  qtyFilteredContacts: PropTypes.number.isRequired
};
