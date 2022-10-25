/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';

import ContactsService from '../../services/ContactsService';

import formatPhone from '../../utils/formatPhone';

import APIError from '../../errors/APIError';

import arrowIcon from '../../assets/icons/arrow.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import sadIcon from '../../assets/icons/sad.svg';
import emptyBoxIcon from '../../assets/icons/empty-box.svg';

import {
  Container,
  InputSearchBarContainer,
  ListHeader,
  Divider,
  EmptyContainer,
  ListContainer,
  Card
} from './styles';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderByName, setOrderByName] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

      setHasError(false);
      setContacts(result);
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

  return (
    <Container>
      <Loader isLoading={isLoading} />
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
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={editIcon} alt="Edit" />
                </Link>
                <button type="button">
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
