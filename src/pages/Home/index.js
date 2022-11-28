import { useHome } from './useHome';

import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';

import { InputSearch } from './components/InputSearch';
import { Header } from './components/Header';
import { EmptyList } from './components/EmptyList';
import { ErrorStatus } from './components/ErrorStatus';

import { Container, Divider } from './styles';
import { SearchNotFound } from './components/SearchNotFound';
import { ListContacts } from './components/ListContacts';

export function Home() {
  const {
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
  } = useHome();

  const hasContacts = !hasError && contacts.length > 0;
  const isEmptyList = !hasError && !isLoading && !hasContacts;
  const isSearchNotFound = hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          searchTerm={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyContacts={contacts.length}
        qtyFilteredContacts={filteredContacts.length}
      />

      <Divider />

      {hasError && <ErrorStatus handleTryAgain={handleLoadContacts} />}

      {isEmptyList && <EmptyList />}

      {isSearchNotFound && <SearchNotFound searchTerm={searchTerm} />}

      {!hasError && (
        <>
          <ListContacts
            orderByName={orderByName}
            filteredContacts={filteredContacts}
            onToggleOrderByName={handleToggleOrderByName}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            isLoading={isLoadingDeleteContact}
            isVisible={isVisibleModalDeleteContact}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDelete?.name}”?`}
            subtitle="Esta ação não poderá ser desfeita!"
            confirmLabel="Deletar"
            danger
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          />
        </>
      )}
    </Container>
  );
}
