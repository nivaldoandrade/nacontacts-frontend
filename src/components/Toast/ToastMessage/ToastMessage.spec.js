/* eslint-disable jest/expect-expect */
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { ToastMessage } from '.';
import { customRender } from '../../../utils/customRender';

describe('ToastMessage Component', () => {
  it('renders correctly', () => {
    const animatedRef = React.createRef();
    const message = {
      id: 1,
      text: 'fake-default',
      type: 'default'
    };

    customRender(
      <ToastMessage
        message={message}
        onPendingRemovalMessage={() => {}}
        isLeaving={false}
        animatedRef={animatedRef}
      />
    );

    expect(screen.getByText(message.text)).toBeInTheDocument();
  });
  it('should remove the message after the duration 7000', () => {
    jest.useFakeTimers();

    const onPendingRemovalMessage = jest.fn();
    const animatedRef = React.createRef();
    const message = {
      id: 1,
      text: 'fake-success',
      type: 'success'
    };

    customRender(
      <ToastMessage
        message={message}
        onPendingRemovalMessage={onPendingRemovalMessage}
        isLeaving={false}
        animatedRef={animatedRef}
      />
    );
    jest.runAllTimers();

    expect(onPendingRemovalMessage).toHaveBeenCalledWith(message.id);
  });
  it('should remove the message when clicked', () => {
    const animatedRef = React.createRef();
    const onPendingRemovalMessage = jest.fn();
    const message = {
      id: 1,
      text: 'fake-danger',
      type: 'danger'
    };

    customRender(
      <ToastMessage
        message={message}
        onPendingRemovalMessage={onPendingRemovalMessage}
        isLeaving={false}
        animatedRef={animatedRef}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onPendingRemovalMessage).toHaveBeenCalledWith(message.id);
  });
});
