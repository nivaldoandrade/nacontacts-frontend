import { act, screen } from '@testing-library/react';

import { EditContact } from '.';
import { customRender } from '../../utils/customRender';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
  Link: ({ children }) => children
}));

describe('EditContact Page', () => {
  it('renders correctly', async () => {
    await act(() => {
      customRender(<EditContact />);
    });

    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
  });
});
