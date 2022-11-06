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
