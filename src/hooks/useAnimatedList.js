import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemoveItemsIds, setPendingRemoveItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItems = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((state) => state.filter((item) => item.id !== itemId));
    setPendingRemoveItemsIds((state) => state.filter((id) => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemoveItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alReadyListenerExists = animationEndListeners.current.has(itemId);

      if (animatedRef?.current && !alReadyListenerExists) {
        const onAnimationEnd = (event) => {
          if (event.animationName === 'cSroTe') {
            handleRemoveItems(itemId);
          }
        };

        const removeListener = () => {
          animatedRef.current.removeEventListener(
            'animationend',
            onAnimationEnd
          );
        };

        animationEndListeners.current.set(itemId, removeListener);

        animatedRef.current.addEventListener('animationend', onAnimationEnd);
      }
    });
  }, [pendingRemoveItemsIds, handleRemoveItems]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handlePendingRemovalItems = useCallback((id) => {
    setPendingRemoveItemsIds((state) => [...state, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemoveItemsIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, { isLeaving, animatedRef });
      }),
    [items, pendingRemoveItemsIds, getAnimatedRef]
  );

  return {
    items,
    setItems,
    renderList,
    handlePendingRemovalItems,
    pendingRemoveItemsIds,
    getAnimatedRef,
    animatedRefs,
    animationEndListeners,
    handleRemoveItems
  };
}
