import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '.';
import { customRender } from '../../utils/customRender';

describe('App Componenent', () => {
  it('renders correctly', async () => {
    const { container } = customRender(<App />, { wrapper: BrowserRouter });

    await act(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
