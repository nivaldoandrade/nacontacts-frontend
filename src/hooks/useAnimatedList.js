import { useCallback, useRef, useState, createRef, useEffect } from 'react';

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
        const onAnimationEnd = () => {
          handleRemoveItems(itemId);
        };

        const removeListener = () => {
          animatedRef.current.removeEventListener(
            'animationend',
            (event) => event.animationName === 'cSroTe' && onAnimationEnd()
          );
        };

        animationEndListeners.current.set(itemId, removeListener);

        animatedRef.current.addEventListener(
          'animationend',
          (event) => event.animationName === 'cSroTe' && onAnimationEnd()
        );
      }
    });

    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, [pendingRemoveItemsIds, handleRemoveItems]);

  const handlePendingRemovalItems = useCallback((id) => {
    setPendingRemoveItemsIds((state) => [...state, id]);
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemoveItemsIds.includes(item.id);

        let animatedRef = animatedRefs.current.get(item.id);

        if (!animatedRef) {
          animatedRef = createRef();
          animatedRefs.current.set(item.id, animatedRef);
        }

        return renderItem(item, { isLeaving, animatedRef });
      }),
    [items, pendingRemoveItemsIds]
  );

  return {
    items,
    setItems,
    renderList,
    handleRemoveItems,
    handlePendingRemovalItems,
    pendingRemoveItemsIds
  };
}
