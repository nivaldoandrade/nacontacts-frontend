import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { ReactPortal } from '../ReactPortal';

import { Overlay, Container } from './styles';

export function Modal({
  isLoading,
  isVisible,
  title,
  subtitle,
  danger,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm
}) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;

    if (!isVisible && overlayRefElement) {
      overlayRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener(
          'animationend',
          handleAnimationEnd
        );
      }
    };
  }, [isVisible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!isVisible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!isVisible}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  isLoading: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

Modal.defaultProps = {
  isLoading: false,
  danger: false,
  subtitle: '',
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar'
};
