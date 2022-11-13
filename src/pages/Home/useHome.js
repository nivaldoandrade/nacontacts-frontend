import { useState, useEffect, useMemo, useCallback } from 'react';

import ContactsService from '../../services/ContactsService';

import formatPhone from '../../utils/formatPhone';
import toast from '../../utils/toast';

import APIError from '../../errors/APIError';

export function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderByName, setOrderByName] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisibleModalDeleteContact, setIsVisibleModalDeleteContact] =
    useState(false);
  const [contactBeingDelete, setContactBeingDelete] = useState(null);
  const [isLoadingDeleteContact, setIsLoadingDeleteContact] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await ContactsService.listContacts(orderByName);

      const formattedContacts = result.map((contact) => ({
        ...contact,
        phoneFormatted: contact.telephone && formatPhone(contact.telephone)
      }));

      setHasError(false);
      setContacts(formattedContacts);
    } catch (error) {
      if (error instanceof APIError) {
        // MOSTRAR ALGO PARA USUÁRIO RELACIONADO ALGUM ERRO DA API
        console.log(error);
      } else {
        // MOSTRAR ALGO PARA USUÁRIO RELACIONADO ALGUM ERRO NO CÓDIGO/JAVASCRIPT NO FRONT-END
        console.log(error);
      }

      setHasError(error.name);
    } finally {
      setIsLoading(false);
    }
  }, [orderByName]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  function handleToggleOrderByName() {
    setOrderByName((state) => (state === 'ASC' ? 'DESC' : 'ASC'));
  }

  function handleLoadContacts() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setIsVisibleModalDeleteContact(true);
    setContactBeingDelete(contact);
  }

  function handleCloseDeleteModal() {
    setIsVisibleModalDeleteContact(false);
    setContactBeingDelete(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDeleteContact(true);
      await ContactsService.deleteContactById(contactBeingDelete.id);

      setContacts((state) =>
        state.filter((contact) => contact.id !== contactBeingDelete.id)
      );

      setIsLoadingDeleteContact(false);

      handleCloseDeleteModal();
      toast({ type: 'success', text: 'Contato deletado com sucesso!' });
    } catch (error) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao deletar o contato' });
    }
  }

  return {
    isLoading,
    isLoadingDeleteContact,
    isVisibleModalDeleteContact,
    contactBeingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    hasError,
    searchTerm,
    filteredContacts,
    handleLoadContacts,
    orderByName,
    handleToggleOrderByName,
    handleDeleteContact,
    contacts,
    handleChangeSearchTerm
  };
}