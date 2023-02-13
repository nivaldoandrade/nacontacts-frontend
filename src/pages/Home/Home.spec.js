import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Home } from '.';
import ContactsService from '../../services/ContactsService';
import { customRender } from '../../utils/customRender';

const contacts = [
  {
    id: '08ece3b4-dcdd-4fac-b1ab-9bc67099a7c6',
    name: 'John Doe 1',
    email: 'jonhdoe1@mail.com.br',
    telephone: '(11) 99999-9999',
    category: {
      id: '9c7d4e7e-ba3a-46ff-a42c-0dc580ee3531',
      name: 'linkedin'
    }
  },
  {
    id: '7c39b9f9-7ac9-49b1-a60d-a3f52cf4f8bb',
    name: 'John Doe 1',
    email: 'jonhdoe1@mail.com.br',
    telephone: '(11) 99999-9999',
    category: {
      id: 'c6311f89-9a70-4937-9451-622b3ba92085',
      name: 'Facebook'
    }
  }
];

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children
}));

describe('Home Page', () => {
  it('renders correctly', async () => {
    await act(() => {
      customRender(<Home />);
    });
    expect(screen.getByText('Novo Contato')).toBeInTheDocument();
  });

  it('should show the search field when the contact list exists', async () => {
    jest
      .spyOn(ContactsService, 'listContacts')
      .mockImplementationOnce(() => contacts);

    customRender(<Home />);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Pesquisar contato...')
      ).toBeInTheDocument();
    });
  });

  it('should show the error status when the API fails', async () => {
    jest.spyOn(ContactsService, 'listContacts').mockImplementationOnce(() => {
      throw new Error();
    });

    customRender(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro ao obter os seus contatos!')
      ).toBeInTheDocument();
    });
  });

  it('should show the EmptyList component when the API returns the empty contact list', async () => {
    jest
      .spyOn(ContactsService, 'listContacts')
      .mockImplementationOnce(() => []);

    customRender(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText(/Você ainda não tem nenhum contato cadastrado!/i)
      ).toBeInTheDocument();
    });
  });

  it('should show the SearchNotFound component when it does not find a contact', async () => {
    jest
      .spyOn(ContactsService, 'listContacts')
      .mockImplementationOnce(() => contacts);

    customRender(<Home />);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Pesquisar contato...');

      fireEvent.change(searchInput, { target: { value: 'fake-value' } });

      expect(
        screen.getByText(/Nenhum resultado foi encontrado para/i)
      ).toBeInTheDocument();
    });
  });
});
