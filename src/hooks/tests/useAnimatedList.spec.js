import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { act } from 'react-dom/test-utils';
import { useAnimatedList } from '../useAnimatedList';

describe('useAnimatedList', () => {
  it('should return the correct initial state', () => {
    const initialValue = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    const { result } = renderHook(() => useAnimatedList(initialValue));

    expect(result.current.items).toEqual(initialValue);
    expect(result.current.pendingRemoveItemsIds).toEqual([]);
  });

  it('should be able to add an item to pending removal', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    const { result } = renderHook(() => useAnimatedList(items));
    const ref = createRef();

    const mockRemoveEventListener = jest.fn();
    const mockAddEventListener = jest.fn((event, cb) => {
      if (event === 'animationend') {
        cb({ animationName: 'cSroTe' });
      }
    });

    ref.current = {
      removeEventListener: mockRemoveEventListener,
      addEventListener: mockAddEventListener
    };
    const itemId = 1;

    act(() => {
      result.current.animatedRefs.current.set(itemId, ref);

      result.current.handlePendingRemovalItems(itemId);
    });

    expect(result.current.pendingRemoveItemsIds).toEqual([]);
    expect(result.current.items).toEqual([{ id: 2, name: 'Item 2' }]);
  });
});
