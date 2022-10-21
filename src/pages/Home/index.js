import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import formatPhone from '../../utils/formatPhone';

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

  useEffect(() => {
    console.log('useEffect');
    fetch(`http://localhost:3333/contacts?orderBy=${orderByName}`)
      .then(async (response) => {
        const result = await response.json();

        setContacts(result);
      })
      .catch((error) => console.log('FETCH CONTACTS', error));
  }, [orderByName]);

  return (
    <Container>
      <InputSearchBarContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchBarContainer>

      <ListHeader>
        <strong>
          {contacts.length} {contacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </ListHeader>

      <Divider />

      <ListContainer orderByName={orderByName}>
        <header>
          <button
            type="button"
            onClick={() =>
              setOrderByName((state) => (state === 'ASC' ? 'DESC' : 'ASC'))
            }
          >
            <span>Nome</span>
            <img src={arrowIcon} alt="Arrow" />
          </button>
        </header>

        {contacts.map((contact) => (
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
