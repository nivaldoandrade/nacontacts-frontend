import { useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export function useToastContainer() {
  const [messages, setMessages] = useState([]);

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

  function handleRemoveMessage(id) {
    setMessages((state) => state.filter((message) => message.id !== id));
  }

  return {
    messages,
    handleRemoveMessage
  };
}
