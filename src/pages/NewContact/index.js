import ContactsService from '../../services/ContactsService';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function NewContact() {
  async function handleSubmit(formData) {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        category_id: formData.categoryId
      };

      const result = await ContactsService.createContact(data);

      console.log(result);
    } catch (error) {
      alert('Ocorreu um erro!!');
    }
  }
  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
