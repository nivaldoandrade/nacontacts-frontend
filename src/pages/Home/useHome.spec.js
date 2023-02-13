import { act, renderHook } from '@testing-library/react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import { useHome } from './useHome';

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

jest.mock('../../utils/toast');

const mockedToast = jest.mocked(toast);

describe('UseHome Hook', () => {
  it('error instance of DOMexpction and error name AbortError', () => {
    jest.spyOn(ContactsService, 'listContacts').mockImplementationOnce(() => {
      throw new DOMException('', 'AbortError');
    });

    const { result } = renderHook(() => useHome());

    expect(result.current.hasError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should change the state orderByName to DESC when orderByname is ASC', async () => {
    const { result } = renderHook(() => useHome());

    await act(() => {
      result.current.handleToggleOrderByName();
    });

    expect(result.current.orderByName).toBe('DESC');
  });

  it('should change the state orderByName to ASC when orderByname is DESC', async () => {
    const { result } = renderHook(() => useHome());

    await act(() => {
      result.current.handleToggleOrderByName();
      result.current.handleToggleOrderByName();
    });

    expect(result.current.orderByName).toBe('ASC');
  });

  it('should call handleLoadContacts function', async () => {
    const { result } = renderHook(() => useHome());

    await act(() => {
      result.current.handleLoadContacts();
    });

    expect(result.current.isLoading).toBeFalsy();
  });

  it('should call handleDeleteContact and set the delete motal to true and contact', async () => {
    const { result } = renderHook(() => useHome());

    await act(() => {
      result.current.handleDeleteContact(contact);
    });

    expect(result.current.isVisibleModalDeleteContact).toBeTruthy();
    expect(result.current.contactBeingDelete).toEqual(contact);
  });

  it('should call handleCloseDeleteModal and set the state IsVisibleModalDeleteContact to false', async () => {
    const { result } = renderHook(() => useHome());

    await act(() => {
      result.current.handleCloseDeleteModal();
    });

    expect(result.isVisibleModalDeleteContact).toBeFalsy();
  });

  it('should call handleConfirmDeleteContact and show success toast', async () => {
    jest
      .spyOn(ContactsService, 'deleteContactById')
      .mockImplementationOnce(() => Promise.resolve());

    jest
      .spyOn(ContactsService, 'listContacts')
      .mockImplementationOnce(() => [contact]);

    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleDeleteContact(contact);
    });

    await act(async () => {
      result.current.handleConfirmDeleteContact();
    });

    expect(result.current.contacts).toEqual([]);
    expect(ContactsService.deleteContactById).toHaveBeenCalledWith(contact.id);
    expect(result.current.isLoadingDeleteContact).toBeFalsy();
    expect(mockedToast).toHaveBeenCalledWith({
      type: 'success',
      text: 'Contato deletado com sucesso!'
    });
  });

  it('should call handleConfirmDeleteContact and show danger toast when error is returned', async () => {
    jest
      .spyOn(ContactsService, 'deleteContactById')
      .mockImplementationOnce(() => Promise.reject());

    const { result } = renderHook(() => useHome());

    await act(() => {
      result.current.handleConfirmDeleteContact();
    });

    expect(mockedToast).toHaveBeenCalledWith({
      type: 'danger',
      text: 'Ocorreu um erro ao deletar o contato'
    });
  });
});
