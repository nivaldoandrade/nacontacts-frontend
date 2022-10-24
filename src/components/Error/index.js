import PropTypes from 'prop-types';

import APIError from '../../errors/APIError';

import Button from '../Button';
import sadIcon from '../../assets/icons/sad.svg';

import { ErrorContainer } from './styles';

export function Error({ typeError }) {
  return (
    <ErrorContainer>
      <img src={sadIcon} alt="Sad" />
      <div className="details">
        <strong>
          {typeError === APIError.name
            ? 'Ocorreu um erro ao obter os seus contatos!'
            : 'Tente novamente mais tarde!'}
        </strong>
        {typeError === APIError.name && (
          <Button type="button">Tentar novamente</Button>
        )}
      </div>
    </ErrorContainer>
  );
}

Error.propTypes = {
  typeError: PropTypes.string.isRequired
};
