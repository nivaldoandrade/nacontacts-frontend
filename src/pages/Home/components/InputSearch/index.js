import PropTypes from 'prop-types';

import { Container } from './styles';

export function InputSearch({ searchTerm, onChange }) {
  return (
    <Container>
      <input
        value={searchTerm}
        type="text"
        placeholder="Pesquisar contato..."
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
