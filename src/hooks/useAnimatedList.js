import { useCallback, useRef, useState, createRef } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemoveItemsIds, setPendingRemoveItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());

  console.log(animatedRefs);

  const handleRemoveItems = useCallback((id) => {
    setItems((state) => state.filter((item) => item.id !== id));
    setPendingRemoveItemsIds((state) =>
      state.filter((itemId) => itemId !== id)
    );
  }, []);

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
