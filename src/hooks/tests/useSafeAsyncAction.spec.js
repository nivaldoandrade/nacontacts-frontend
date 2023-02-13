import { renderHook } from '@testing-library/react';
import { useIsMounted } from '../useIsMounted';
import { useSafeAsyncAction } from '../useSafeAsyncAction';

jest.mock('../useIsMounted');

const mockedUseIsMounted = jest.mocked(useIsMounted);

describe('UseSafeAsyncAction Hook', () => {
  it('should execute callback function when the isMounted is true', () => {
    mockedUseIsMounted.mockReturnValue(() => true);
    const callback = jest.fn();

    const { result } = renderHook(() => useSafeAsyncAction());

    result.current(callback);

    expect(callback).toHaveBeenCalled();
  });

  it('should not execute callback function when the isMounted is false', () => {
    mockedUseIsMounted.mockReturnValue(() => false);
    const callback = jest.fn();

    const { result } = renderHook(() => useSafeAsyncAction());

    result.current(callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
