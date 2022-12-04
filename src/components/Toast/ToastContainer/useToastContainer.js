import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export function useToastContainer() {
  const [messages, setMessages] = useState([]);
  const [pendingRemoveMessagesIds, setPendingRemoveMessagesIds] = useState([]);

  useEffect(() => {
    function handleAddEventListener({ type, text, duration }) {
      setMessages((state) => [
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
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((state) => state.filter((message) => message.id !== id));
    setPendingRemoveMessagesIds((state) =>
      state.filter((messageId) => messageId !== id)
    );
  }, []);

  const handlePendingRemovalMessage = useCallback((id) => {
    setPendingRemoveMessagesIds((state) => [...state, id]);
  }, []);

  return {
    messages,
    handleRemoveMessage,
    handlePendingRemovalMessage,
    pendingRemoveMessagesIds
  };
}
