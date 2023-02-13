import { act } from 'react-dom/test-utils';
import { useErrors } from '../useErrors';

const { renderHook } = require('@testing-library/react');

describe('UseErrors Hook', () => {
  it('should be add error', () => {
    const { result } = renderHook(() => useErrors());

    const primaryError = { field: 'name', message: 'Name is required' };

    act(() => {
      result.current.setError(primaryError);
    });

    expect(result.current.errors).toEqual(
      expect.arrayContaining([expect.objectContaining(primaryError)])
    );

    const secondyError = { field: 'name', message: 'Name is required' };

    act(() => {
      result.current.setError(secondyError);
    });

    expect(result.current.errors).toEqual(
      expect.arrayContaining([expect.objectContaining(secondyError)])
    );
  });

  it('should be remove error', () => {
    const { result } = renderHook(() => useErrors());

    const error = { field: 'name', message: 'Name is required' };

    act(() => {
      result.current.setError(error);
    });

    expect(result.current.errors).toEqual(
      expect.arrayContaining([expect.objectContaining(error)])
    );

    act(() => {
      result.current.removeError(error.field);
    });

    expect(result.current.errors).toEqual([]);
  });

  it('should get one error message per field name', () => {
    const { result } = renderHook(() => useErrors());

    const nameError = { field: 'name', message: 'Name is required' };
    const emailError = { field: 'email', message: 'Email is required' };

    act(() => {
      result.current.setError(nameError);
      result.current.setError(emailError);
    });

    expect(result.current.getErrorMessageByFieldName(nameError.field)).toEqual(
      nameError.message
    );
  });
});
