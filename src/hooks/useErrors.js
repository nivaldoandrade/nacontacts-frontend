import { useState } from 'react';

export function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorIsAlreadyExists = errors.find((error) => error.field === field);

    if (errorIsAlreadyExists) {
      return;
    }

    setErrors((state) => [...state, { field, message }]);
  }

  function removeError(fieldName) {
    setErrors((state) => state.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return { setError, removeError, getErrorMessageByFieldName };
}
