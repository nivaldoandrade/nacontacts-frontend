import PropTypes from 'prop-types';

import { Button } from '../Button';

import sadIcon from '../../assets/icons/sad.svg';

import { ErrorContainer } from './styles';

export function Error({ icon, message, onCLick }) {
  return (
    <ErrorContainer>
      <img src={icon.src} alt={icon.alt} />
      <div className="details">
        <strong>{message}</strong>
        <Button type="button" onClick={onCLick()}>
          Tentar novamente
        </Button>
      </div>
    </ErrorContainer>
  );
}

Error.propTypes = {
  icon: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }),
  message: PropTypes.string.isRequired,
  onCLick: PropTypes.func.isRequired
};

Error.defaultProps = {
  icon: {
    src: sadIcon,
    alt: 'sad'
  }
};
