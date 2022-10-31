import { ThemeProvider } from 'styled-components';

import theme from '../../assets/styles/themes/default';

import GlobalStyles from '../../assets/styles/global';
import { Container } from './styles';
import { Header } from '../Header';
// import { ContactList } from '../ContactsList';
import { Routes } from '../../routes';
import { ToastContainer } from '../Toast/ToastContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        {/* <ContactList /> */}
        <Routes />
      </Container>
      <ToastContainer />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
