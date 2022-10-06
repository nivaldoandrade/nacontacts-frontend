import { ThemeProvider } from 'styled-components';

import theme from '../../assets/styles/themes/default';

import GlobalStyles from '../../assets/styles/global';
import { Container } from './styles';
import { Header } from '../Header';
import { ContactList } from '../ContactsList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <ContactList />
      </Container>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
