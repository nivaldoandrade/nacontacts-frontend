import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Container } from './styles';

import xCircleIcon from '../../../assets/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/icons/check-circle.svg';

export function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const settTimeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(settTimeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleOnClickMessage() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      duration={message.duration || 7000}
      type={message.type}
      onClick={handleOnClickMessage}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="Danger" />}
      {message.type === 'success' && (
        <img src={checkCircleIcon} alt="Success" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired
};
