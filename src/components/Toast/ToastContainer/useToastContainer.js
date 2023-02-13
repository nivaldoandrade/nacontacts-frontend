import { useEffect } from 'react';
import { useAnimatedList } from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';

export function useToastContainer() {
  const { setItems, renderList, handlePendingRemovalItems } = useAnimatedList();

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
    handlePendingRemovalMessage: handlePendingRemovalItems
  };
}
