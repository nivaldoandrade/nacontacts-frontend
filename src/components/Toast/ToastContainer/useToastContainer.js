import { useEffect } from 'react';
import { toastEventManager } from '../../../utils/toast';
import { useAnimatedList } from '../../../hooks/useAnimatedList';

export function useToastContainer() {
  const { setItems, renderList, handlePendingRemovalItems, handleRemoveItems } =
    useAnimatedList();

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
    renderList,
    handleRemoveMessage: handleRemoveItems,
    handlePendingRemovalMessage: handlePendingRemovalItems
  };
}
