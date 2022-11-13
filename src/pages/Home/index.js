/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import { useHome } from './useHome';

import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { Modal } from '../../components/Modal';

import arrowIcon from '../../assets/icons/arrow.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import sadIcon from '../../assets/icons/sad.svg';
import emptyBoxIcon from '../../assets/icons/empty-box.svg';
import magnifierQuestionIcon from '../../assets/icons/magnifier-question.svg';

import {
  Container,
  InputSearchBarContainer,
  ListHeader,
  Divider,
  EmptyContainer,
  SearchEmptyContainer,
  ListContainer,
  Card
} from './styles';

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

  return (
    <Container>
      <Loader isLoading={isLoading} />

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

      {!hasError && contacts.length > 0 && (
        <InputSearchBarContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato..."
            onChange={(e) => handleChangeSearchTerm(e)}
          />
        </InputSearchBarContainer>
      )}

      <ListHeader
        hasError={hasError}
        justifyContent={
          hasError
            ? 'flex-end'
            : contacts.length > 0
            ? 'space-between'
            : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </ListHeader>

      <Divider />

      {hasError && (
        <Error
          icon={{ src: sadIcon, alt: 'sad' }}
          message="Ocorreu um erro ao obter os seus contatos!"
          onCLick={() => handleLoadContacts}
        />
      )}

      {contacts.length === 0 && !isLoading && !hasError && (
        <EmptyContainer>
          <img src={emptyBoxIcon} alt="Empty box" />
          <span>
            Você ainda não tem nenhum contato cadastrado! <br />
            Clique no botão<strong> ”Novo contato” </strong>à cima para
            cadastrar o seu primeiro!
          </span>
        </EmptyContainer>
      )}

      {!hasError && contacts.length > 0 && filteredContacts.length < 1 && (
        <SearchEmptyContainer>
          <img src={magnifierQuestionIcon} alt="Magnifier question" />
          <span>
            Nenhum resultado foi encontrado para
            <b> ”{searchTerm}”</b>.
          </span>
        </SearchEmptyContainer>
      )}

      {!hasError && (
        <ListContainer orderByName={orderByName}>
          {filteredContacts.length > 0 && (
            <header>
              <button type="button" onClick={handleToggleOrderByName}>
                <span>Nome</span>
                <img src={arrowIcon} alt="Arrow" />
              </button>
            </header>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="info-header">
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phoneFormatted}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={editIcon} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
