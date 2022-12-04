import { ToastMessage } from '../ToastMessage';

import { Container } from './styles';
import { useToastContainer } from './useToastContainer';

export function ToastContainer() {
  const { renderList, handleRemoveMessage, handlePendingRemovalMessage } =
    useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          onPendingRemovalMessage={handlePendingRemovalMessage}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
