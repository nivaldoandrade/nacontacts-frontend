import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { ContactForm } from '.';
import CategoriesService from '../../services/CategoriesService';

import { customRender } from '../../utils/customRender';

describe('ContactForm Component', () => {
  it('renders correctly', async () => {
    await act(async () => {
      customRender(<ContactForm buttonLabel="criar" onSubmit={() => {}} />);
    });

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const phoneInput = screen.getByPlaceholderText('Telefone');
    const selectInput = screen.getByText('Sem categoria');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(selectInput).toBeInTheDocument();
  });

  it('call onSubmit when the submit button is clicked', async () => {
    const onSubmit = jest.fn();

    await act(async () => {
      customRender(<ContactForm buttonLabel="editar" onSubmit={onSubmit} />);
    });

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const phoneInput = screen.getByPlaceholderText('Telefone');
    const selectInput = screen.getByTestId('select-element');

    fireEvent.change(nameInput, { target: { value: 'jonh doe' } });
    fireEvent.change(emailInput, { target: { value: 'jonhdoe@mail.com' } });
    fireEvent.change(phoneInput, { target: { value: '11999999999' } });
    fireEvent.change(selectInput, { target: { value: 'fake-category-id' } });

    fireEvent.click(screen.getByText('editar'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
  it('should change the category selected', async () => {
    jest.spyOn(CategoriesService, 'get').mockImplementation(() => [
      { id: 1, name: 'facebook' },
      { id: 2, name: 'instagram' },
      { id: 3, name: 'twitter' }
    ]);

    await act(async () => {
      customRender(<ContactForm buttonLabel="editar" onSubmit={() => {}} />);
    });

    const selectInput = screen.getByTestId('select-element');

    fireEvent.change(selectInput, { target: { value: 1 } });

    await waitFor(() => {
      expect(screen.getByText('facebook')).toBeInTheDocument();
    });
  });
});
