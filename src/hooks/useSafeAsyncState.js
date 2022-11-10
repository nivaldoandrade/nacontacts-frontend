import { useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export function useSafeAsycnState(initialState) {
  const [state, setState] = useState(initialState);
  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback(
    (data) => {
      if (isMounted()) {
        setState(data);
      }
    },
    [isMounted]
  );

  return [state, setSafeAsyncState];
}
