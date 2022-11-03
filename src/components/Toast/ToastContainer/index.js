import { useEffect, useState } from 'react';

import { ToastMessage } from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

import { Container } from './styles';

export function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddEventListener({ type, text }) {
      setMessages((state) => [
        ...state,
        {
          id: Math.random(),
          type,
          text
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

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
