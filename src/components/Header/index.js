import logoImg from '../../assets/images/logo.svg';

import { Container, ContainerInputSearchBar } from './styles';

export function Header() {
  return (
    <Container>
      <img src={logoImg} alt="NaContacts Logo" />
      <ContainerInputSearchBar>
        <input type="text" placeholder="Pesquisar contato..." />
      </ContainerInputSearchBar>
    </Container>
  );
}
