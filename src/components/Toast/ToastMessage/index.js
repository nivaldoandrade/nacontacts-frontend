import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Container } from './styles';

import xCircleIcon from '../../../assets/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/icons/check-circle.svg';

export function ToastMessage({
  message,
  onPendingRemovalMessage,
  isLeaving,
  animatedRef
}) {
  // const containerRef = useRef(null);
  // useEffect(() => {
  //   function handleRemoveMessage() {
  //     onRemoveMessage(message.id);
  //   }

  //   const containerRefElement = containerRef.current;
  //   if (isLeaving) {
  //     containerRefElement.addEventListener(
  //       'animationend',
  //       (event) => event.animationName === 'cSroTe' && handleRemoveMessage()
  //     );
  //   }

  //   return () => {
  //     containerRefElement.removeEventListener(
  //       'animationend',
  //       (event) => event.animationName === 'cSroTe' && handleRemoveMessage()
  //     );
  //   };
  // }, [isLeaving, message.id, onRemoveMessage]);

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

ToastMessage.propTypes = {
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
