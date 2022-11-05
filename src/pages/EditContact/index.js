import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import contactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Loader } from '../../components/Loader';

export function EditContact() {
  const [contactName, setContactName] = useState('');
  const [isLoading, setIsloading] = useState(true);

  const { id: contactId } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);

  const loadContacts = useCallback(async () => {
    try {
      const result = await contactsService.getContactById(contactId);

      setIsloading(false);
      contactFormRef.current.setFieldValue(result);
      setContactName(result.name);
    } catch {
      history.push('/');
      toast({ type: 'danger', text: 'Contato não encontrado!' });
    }
  }, [contactId, history]);

  function handleSubmit() {
    console.log('handleSubmit');
  }

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={`Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
