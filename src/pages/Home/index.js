import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

import { Loader } from '../../components/Loader';

import formatPhone from '../../utils/formatPhone';
import delay from '../../utils/delay';

import arrowIcon from '../../assets/icons/arrow.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import {
  Container,
  InputSearchBarContainer,
  ListHeader,
  Divider,
  ListContainer,
  Card
} from './styles';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderByName, setOrderByName] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:3333/contacts?orderBy=${orderByName}`
        );

        await delay(500);

        const result = await response.json();
        setContacts(result);
      } catch (error) {
        console.log('FETCH CONTACTS', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderByName]);

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  function handleToggleOrderByName() {
    setOrderByName((state) => (state === 'ASC' ? 'DESC' : 'ASC'));
  }

  console.log('render');

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchBarContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar contato..."
          onChange={(e) => handleChangeSearchTerm(e)}
        />
      </InputSearchBarContainer>

      <ListHeader>
        <strong>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </ListHeader>

      <Divider />

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
    </Container>
  );
}
