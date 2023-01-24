import PropTypes from 'prop-types';

import { StyledSpinner } from './styles';

export function Spinner({ size }) {
  return <StyledSpinner data-testid="spinner" size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number
};

Spinner.defaultProps = {
  size: 32
};
