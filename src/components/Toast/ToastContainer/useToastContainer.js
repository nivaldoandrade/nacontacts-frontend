import { useEffect } from 'react';
import { toastEventManager } from '../../../utils/toast';
import { useAnimatedList } from '../../../hooks/useAnimatedList';

export function useToastContainer() {
  const {
    items,
    setItems,
    handlePendingRemovalItems,
    handleRemoveItems,
    pendingRemoveItemsIds
  } = useAnimatedList();

  useEffect(() => {
    function handleAddEventListener({ type, text, duration }) {
      setItems((state) => [
        ...state,
        {
          id: Math.random(),
          type,
          text,
          duration
        }
      ]);
    }
    toastEventManager.subscribe('addtoast', handleAddEventListener);

    return () => {
      toastEventManager.unsubscribe('addtoast', handleAddEventListener);
    };
  }, [setItems]);

  return {
    messages: items,
    handleRemoveMessage: handleRemoveItems,
    handlePendingRemovalMessage: handlePendingRemovalItems,
    pendingRemoveMessagesIds: pendingRemoveItemsIds
  };
}
