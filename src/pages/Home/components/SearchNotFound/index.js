import PropTypes from 'prop-types';

import magnifierQuestionIcon from '../../../../assets/icons/magnifier-question.svg';

import { Container } from './styles';

export function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestionIcon} alt="Magnifier question" />
      <span>
        Nenhum resultado foi encontrado para
        <b> ”{searchTerm}”</b>.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired
};
