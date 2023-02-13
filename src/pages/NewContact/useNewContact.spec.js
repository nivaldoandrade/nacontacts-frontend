import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { useNewContact } from './useNewContact';

import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

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

describe('UseNewContact Hook', () => {
  it('should create contact and show toast success', async () => {
    jest
      .spyOn(ContactsService, 'createContact')
      .mockImplementationOnce(() => contact);

    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        resetFields: jest.fn()
      }
    });

    const { result } = renderHook(() => useNewContact());

    await waitFor(() => {
      result.current.handleSubmit(contact);
    });

    expect(mockedToast).toHaveBeenCalledWith({
      type: 'success',
      text: 'Contato cadastrado com sucesso!'
    });
  });

  it('should be show toast danger if an error occurs in the creation of the contact', async () => {
    jest.spyOn(ContactsService, 'createContact').mockImplementationOnce(() => {
      throw new Error();
    });

    const { result } = renderHook(() => useNewContact());

    await waitFor(() => {
      result.current.handleSubmit(contact);
    });

    expect(mockedToast).toHaveBeenCalledWith({
      type: 'danger',
      text: 'Ocorreu um erro ao cadastra o contato!'
    });
  });
});
