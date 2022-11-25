import emptyBoxIcon from '../../../../assets/icons/empty-box.svg';

import { Container } from './styles';

export function EmptyList() {
  return (
    <Container>
      <img src={emptyBoxIcon} alt="Empty box" />
      <span>
        Você ainda não tem nenhum contato cadastrado! <br />
        Clique no botão<strong> ”Novo contato” </strong>à cima para cadastrar o
        seu primeiro!
      </span>
    </Container>
  );
}
