import PropTypes from 'prop-types';

import { Error } from '../../../../components/Error';

export function ErrorStatus({ handleTryAgain }) {
  return (
    <Error
      message="Ocorreu um erro ao obter os seus contatos!"
      onCLick={() => handleTryAgain}
    />
  );
}

ErrorStatus.propTypes = {
  handleTryAgain: PropTypes.func.isRequired
};
