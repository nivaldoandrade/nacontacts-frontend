import { Link } from 'react-router-dom';

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
// import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';

export function Home() {
  return (
    <Container>
      <Loader />
      {/* <Modal danger /> */}
      <InputSearchBarContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchBarContainer>

      <ListHeader>
        <strong>3 contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </ListHeader>

      <Divider />

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrowIcon} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="info-header">
              <strong>Mateus Silva</strong>
              <small>instagram</small>
            </div>
            <span>mateus@devacademy.com.br</span>
            <span>(41) 99999-9999</span>
          </div>
          <div className="actions">
            <Link to="/edit/1">
              <img src={editIcon} alt="Edit" />
            </Link>
            <button type="button">
              <img src={deleteIcon} alt="Delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
