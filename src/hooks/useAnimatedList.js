import { useCallback, useRef, useState, createRef, useEffect } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemoveItemsIds, setPendingRemoveItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItems = useCallback((id) => {
    setItems((state) => state.filter((item) => item.id !== id));
    setPendingRemoveItemsIds((state) =>
      state.filter((itemId) => itemId !== id)
    );
  }, []);

  useEffect(() => {
    pendingRemoveItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alReadyListenerExists = animationEndListeners.current.has(itemId);

      if (animatedRef?.current && !alReadyListenerExists) {
        animationEndListeners.current.set(itemId, true);

        animatedRef.current.addEventListener(
          'animationend',
          (event) =>
            event.animationName === 'cSroTe' && handleRemoveItems(itemId)
        );
      }
    });
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
