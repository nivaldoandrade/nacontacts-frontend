import PropTypes from 'prop-types';

import { ReactPortal } from '../ReactPortal';
import { Spinner } from '../Spinner';

import { useAminatedUnmount } from '../../hooks/useAminatedUnmount';

import { Overlay } from './styles';

export function Loader({ isLoading }) {
  const { shouldRender, animationRef } = useAminatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay ref={animationRef} isLeaving={!isLoading}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
