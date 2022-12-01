import { useEffect, useRef, useState } from 'react';

export function useAminatedUnmount(isVisible) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const animationRefElement = animationRef.current;

    if (!isVisible && animationRefElement) {
      animationRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (animationRefElement) {
        animationRefElement.removeEventListener(
          'animationend',
          handleAnimationEnd
        );
      }
    };
  }, [isVisible]);

  return {
    shouldRender,
    animationRef
  };
}
