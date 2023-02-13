import { act, screen } from '@testing-library/react';
import App from '.';
import { customRender } from '../../utils/customRender';

jest.mock('../../router', () => ({
  Router: () => <div data-testid="mocked-router" />
}));

describe('App Componenent', () => {
  it('renders correctly', async () => {
    const { container } = customRender(<App />);

    await act(() => {
      expect(container).toBeInTheDocument();
      expect(screen.getByTestId('mocked-router')).toBeInTheDocument();
    });
  });
});
