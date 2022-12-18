import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import contactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';

export function useEditContact() {
  const [contactName, setContactName] = useState('');
  const [isLoading, setIsloading] = useState(true);

  const { id: contactId } = useParams();
  const navigate = useNavigate();
  const contactFormRef = useRef(null);
  const safeAsynAction = useSafeAsyncAction();

  const loadContacts = useCallback(
    async (signal) => {
      try {
        const result = await contactsService.getContactById(contactId, signal);

        safeAsynAction(() => {
          contactFormRef.current.setFieldValue(result);
          setIsloading(false);
          setContactName(result.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsynAction(() => {
          navigate('/', { replace: true });
          toast({ type: 'danger', text: 'Contato não encontrado!' });
        });
      }
    },
    [contactId, navigate, safeAsynAction]
  );

  async function handleSubmit(formData) {
    try {
      setIsloading(true);

      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        category_id: formData.categoryId
      };

      const result = await contactsService.updateContactById(
        contactId,
        contact
      );

      setContactName(result.name);
      setIsloading(false);

      toast({ type: 'success', text: 'Contato editado com sucesso!' });
    } catch (error) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao editar o contato!' });
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit
  };
}
