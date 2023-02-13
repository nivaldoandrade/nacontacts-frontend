import { act } from 'react-dom/test-utils';
import { useIsMounted } from '../useIsMounted';
import { useSafeAsycnState } from '../useSafeAsyncState';

const { renderHook } = require('@testing-library/react');

jest.mock('../useIsMounted');

const mockedUseIsMounted = jest.mocked(useIsMounted);

describe('UseSafeAsyncState Hook', () => {
  it('should return the state with the initial value', () => {
    const initialValue = { id: 1, name: 'Jonh Doe' };

    const { result } = renderHook(() => useSafeAsycnState(initialValue));

    const [state] = result.current;

    expect(state).toEqual(initialValue);
  });

  it('should set the state received in the setSafeAsyncState if isMounted is true', () => {
    mockedUseIsMounted.mockReturnValue(() => true);
    const data = { id: 1, name: 'Jonh Doe' };

    const { result, rerender } = renderHook(() => useSafeAsycnState());

    const [, setSafeAsyncState] = result.current;

    act(() => {
      setSafeAsyncState(data);
    });

    rerender();

    expect(result.current[0]).toEqual(data);
  });

  it('should not set the state received in the setSafeAsyncState if insMounted is false', () => {
    mockedUseIsMounted.mockReturnValue(() => false);

    const data = { id: 1, name: 'Jonh Doe' };

    const { result, rerender } = renderHook(() => useSafeAsycnState());

    const [, setSafeAsyncState] = result.current;

    act(() => {
      setSafeAsyncState(data);
    });

    rerender();

    expect(result.current[0]).toEqual();
  });
});
