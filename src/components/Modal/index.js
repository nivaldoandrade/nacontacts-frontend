import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Button from '../Button';

import { Overlay, Container } from './styles';

export function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza que deseja remover o contato ”Mateus Silva”?</h1>
        <p>Esta ação não poderá ser desfeita!</p>
        <footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  danger: PropTypes.bool
};

Modal.defaultProps = {
  danger: false
};
