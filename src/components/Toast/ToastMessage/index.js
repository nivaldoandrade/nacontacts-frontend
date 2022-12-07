import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';

import { Container } from './styles';

import xCircleIcon from '../../../assets/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/icons/check-circle.svg';

function ToastMessageMemo({
  message,
  onPendingRemovalMessage,
  isLeaving,
  animatedRef
}) {
  useEffect(() => {
    const settTimeoutId = setTimeout(() => {
      onPendingRemovalMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(settTimeoutId);
    };
  }, [message, onPendingRemovalMessage]);

  function handleOnClickMessage() {
    onPendingRemovalMessage(message.id);
  }

  return (
    <Container
      ref={animatedRef}
      duration={message.duration || 7000}
      type={message.type}
      onClick={handleOnClickMessage}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="Danger" />}
      {message.type === 'success' && (
        <img src={checkCircleIcon} alt="Success" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessageMemo.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number
  }).isRequired,
  onPendingRemovalMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired
};

export const ToastMessage = memo(ToastMessageMemo);
