import { ToastMessage } from '../ToastMessage';

import { Container } from './styles';
import { useToastContainer } from './useToastContainer';

export function ToastContainer() {
  const {
    messages,
    handleRemoveMessage,
    handlePendingRemovalMessage,
    pendingRemoveMessagesIds
  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          onPendingRemovalMessage={handlePendingRemovalMessage}
          isLeaving={pendingRemoveMessagesIds.includes(message.id)}
        />
      ))}
    </Container>
  );
}
