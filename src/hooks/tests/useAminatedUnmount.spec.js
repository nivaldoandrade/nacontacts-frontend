import { renderHook } from '@testing-library/react';
import React from 'react';
import { useAminatedUnmount } from '../useAminatedUnmount';

describe('useAminatedUnmount Hook', () => {
  it('should update the ShouldRender state when isVisible is true', () => {
    const isVisible = true;

    const { result } = renderHook(() => useAminatedUnmount(isVisible));

    expect(result.current.shouldRender).toBeTruthy();
  });

  it('should execute AddEventListener and RemoveEventListener when isVisible is false', () => {
    const isVisible = false;
    const addEventListener = jest
      .fn()
      .mockImplementationOnce((event, callback) => {
        callback();
      });
    const removeEventListener = jest
      .fn()
      .mockImplementationOnce((event, callback) => {
        callback();
      });

    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        addEventListener,
        removeEventListener
      }
    });

    const { result } = renderHook(() => useAminatedUnmount(isVisible));

    expect(result.current.shouldRender).toBeFalsy();

    expect(addEventListener).toHaveBeenCalledWith(
      'animationend',
      expect.any(Function)
    );
  });
});
