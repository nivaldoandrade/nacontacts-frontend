import { useEffect, useState } from 'react';

import { ToastMessage } from '../ToastMessage';

import { Container } from './styles';

export function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddEventListener(e) {
      console.log(e);
      setMessages((state) => [
        ...state,
        {
          id: Math.random(),
          type: e.detail.type,
          text: e.detail.text
        }
      ]);
    }

    window.addEventListener('addtoast', handleAddEventListener);

    return () => {
      window.removeEventListener('addtoast', handleAddEventListener);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
