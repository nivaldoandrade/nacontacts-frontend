import { act, screen } from '@testing-library/react';
import { NewContact } from '.';
import { customRender } from '../../utils/customRender';

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children
}));

describe('NewContact Page', () => {
  it('renders correctly', async () => {
    await act(() => {
      customRender(<NewContact />);
    });

    expect(screen.getByText('Novo contato')).toBeInTheDocument();
  });
});
