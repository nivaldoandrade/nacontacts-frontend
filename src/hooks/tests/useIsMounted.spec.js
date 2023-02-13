import { renderHook } from '@testing-library/react';
import { useIsMounted } from '../useIsMounted';

describe('UseIsMounted Hook', () => {
  it('should return the state isMounted true when the component is mounted', () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current()).toBeTruthy();
  });
  it('should set the state isMounted false when the component is unmount', () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    expect(result.current()).toBeTruthy();

    unmount();

    expect(result.current()).toBeFalsy();
  });
});
