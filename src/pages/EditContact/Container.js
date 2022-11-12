import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import Presentation from './Presentation';

export default function Container() {
  const [contactName, setContactName] = useState('');
  const [isLoading, setIsloading] = useState(true);

  const { id: contactId } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);
  const safeAsynAction = useSafeAsyncAction();

  const loadContacts = useCallback(async () => {
    try {
      const result = await ContactsService.getContactById(contactId);

      safeAsynAction(() => {
        contactFormRef.current.setFieldValue(result);
        setIsloading(false);
        setContactName(result.name);
      });
    } catch {
      safeAsynAction(() => {
        history.push('/');
        toast({ type: 'danger', text: 'Contato não encontrado!' });
      });
    }
  }, [contactId, history, safeAsynAction]);

  async function handleSubmit(formData) {
    try {
      setIsloading(true);

      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        category_id: formData.categoryId
      };

      const result = await ContactsService.updateContactById(
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
    loadContacts();
  }, [loadContacts]);

  return (
    <Presentation
      contactFormRef={contactFormRef}
      contactName={contactName}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
}
