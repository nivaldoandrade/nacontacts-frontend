import { useCallback, useState } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemoveItemsIds, setPendingRemoveItemsIds] = useState([]);

  const handleRemoveItems = useCallback((id) => {
    setItems((state) => state.filter((item) => item.id !== id));
    setPendingRemoveItemsIds((state) =>
      state.filter((itemId) => itemId !== id)
    );
  }, []);

  const handlePendingRemovalItems = useCallback((id) => {
    setPendingRemoveItemsIds((state) => [...state, id]);
  }, []);

  return {
    items,
    setItems,
    handleRemoveItems,
    handlePendingRemovalItems,
    pendingRemoveItemsIds
  };
}
