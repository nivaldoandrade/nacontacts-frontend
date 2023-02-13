import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

import { useEditContact } from './useEditContact';

const mockNagivate = jest.fn();

jest.mock('react-router-dom', () => ({
  useParams: () => jest.fn(),
  useNavigate: () => mockNagivate
}));

jest.mock('../../utils/toast');

const mockedToast = jest.mocked(toast);

const contact = {
  id: 1,
  name: 'John Doe',
  email: 'John@mail.com',
  telephone: '1111111',
  category: {
    id: 1,
    name: 'Facebook'
  }
};

describe('UseEditContact Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load contact and set contact name state', async () => {
    jest
      .spyOn(ContactsService, 'getContactById')
      .mockImplementationOnce(() => contact);

    const { result } = renderHook(() => useEditContact());

    await waitFor(() => {
      expect(result.current.contactName).toBe(contact.name);
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('should be redirected to the home page if no contact is found', async () => {
    jest.spyOn(ContactsService, 'getContactById').mockImplementationOnce(() => {
      throw new Error();
    });

    const { result } = renderHook(() => useEditContact());

    await waitFor(() => {
      expect(mockedToast).toHaveBeenCalledWith({
        type: 'danger',
        text: 'Contato não encontrado!'
      });
      expect(result.current.contactName).toBe('');
      expect(mockNagivate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  it('error instance of DOMexpction and error name AbortError', () => {
    jest.spyOn(ContactsService, 'getContactById').mockImplementationOnce(() => {
      throw new DOMException('', 'AbortError');
    });

    renderHook(() => useEditContact());

    expect(mockNagivate).not.toHaveBeenCalledWith('/');
  });

  it('should update the contact and set contact name state and loading to false', async () => {
    jest
      .spyOn(ContactsService, 'updateContactById')
      .mockImplementationOnce(() => contact);

    const { result } = renderHook(() => useEditContact());

    await act(async () => {
      await result.current.handleSubmit(contact);
    });

    expect(result.current.contactName).toBe(contact.name);
    expect(result.current.isLoading).toBeFalsy();
  });
  it('should show toast if it gives error when updating the contact', async () => {
    jest
      .spyOn(ContactsService, 'updateContactById')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const { result } = renderHook(() => useEditContact());

    await act(async () => {
      await result.current.handleSubmit(contact);
    });

    expect(mockedToast).toHaveBeenCalledWith({
      type: 'danger',
      text: 'Ocorreu um erro ao editar o contato!'
    });
  });
});
