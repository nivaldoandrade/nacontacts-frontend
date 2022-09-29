import { ThemeProvider } from 'styled-components';

import theme from './assets/styles/themes/default';

import GlobalStyles from './assets/styles/global';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Nacontacts</h1>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
