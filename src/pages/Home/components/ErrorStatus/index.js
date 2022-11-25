import PropTypes from 'prop-types';

import { Error } from '../../../../components/Error';

import sadIcon from '../../../../assets/icons/sad.svg';

export function ErrorStatus({ handleTryAgain }) {
  return (
    <Error
      icon={{ src: sadIcon, alt: 'sad' }}
      message="Ocorreu um erro ao obter os seus contatos!"
      onCLick={() => handleTryAgain}
    />
  );
}

ErrorStatus.propTypes = {
  handleTryAgain: PropTypes.func.isRequired
};
