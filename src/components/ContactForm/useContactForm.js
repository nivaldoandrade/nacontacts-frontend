import { useEffect, useState, useImperativeHandle } from 'react';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import { useSafeAsycnState } from '../../hooks/useSafeAsyncState';

export function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsycnState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsycnState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  useImperativeHandle(
    ref,
    () => ({
      setFieldValue: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setTelephone(contact.telephone ? formatPhone(contact.telephone) : '');
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setTelephone('');
        setCategoryId('');
      }
    }),
    []
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await CategoriesService.get();

        setCategories(result);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'Email inválido' });
    } else {
      removeError('email');
    }
  }

  function handleTelephoneChange(e) {
    setTelephone(formatPhone(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit({ name, email, telephone, categoryId });

    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    telephone,
    handleTelephoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid
  };
}
