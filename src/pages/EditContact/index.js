import { useEditContact } from './useEditContact';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Loader } from '../../components/Loader';

export function EditContact() {
  const { isLoading, contactName, contactFormRef, handleSubmit } =
    useEditContact();

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
