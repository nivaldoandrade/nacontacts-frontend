import { useCallback, useState } from 'react';

export function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(
    ({ field, message }) => {
      const errorIsAlreadyExists = errors.find(
        (error) => error.field === field
      );

      if (errorIsAlreadyExists) {
        return;
      }

      setErrors((state) => [...state, { field, message }]);
    },
    [errors]
  );

  const removeError = useCallback((fieldName) => {
    setErrors((state) => state.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (fieldName) => errors.find((error) => error.field === fieldName)?.message,
    [errors]
  );

  return { errors, setError, removeError, getErrorMessageByFieldName };
}
