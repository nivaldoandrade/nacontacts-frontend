import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

import toast from '../../utils/toast';

export function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        category_id: formData.categoryId
      };

      await ContactsService.createContact(data);

      contactFormRef.current.resetFields();

      toast({ type: 'success', text: 'Contato cadastrado com sucesso!' });
    } catch {
      toast({ type: 'danger', text: 'Ocorreu um erro ao cadastra o contato!' });
    }
  }
  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
