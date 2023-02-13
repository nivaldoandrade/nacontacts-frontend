import { act, renderHook } from '@testing-library/react';
import { createRef } from 'react';
import formatPhone from '../../utils/formatPhone';
import { useContactForm } from './useContactForm';

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

describe('UseContactForm Hook', () => {
  it('should set contact data with setFieldValue', async () => {
    const submit = jest.fn();
    const ref = createRef();
    const { result } = renderHook(() => useContactForm(submit, ref));

    await act(() => {
      ref.current.setFieldValue(contact);
    });

    expect(result.current.name).toEqual(contact.name);
    expect(result.current.email).toEqual(contact.email);
    expect(result.current.telephone).toEqual(formatPhone(contact.telephone));
    expect(result.current.categoryId).toEqual(contact.category.id);
  });

  it('should set contact with empty if non-exists contact', async () => {
    const submit = jest.fn();
    const ref = createRef();

    const { result } = renderHook(() => useContactForm(submit, ref));

    await act(() => {
      ref.current.setFieldValue({ category: {} });
    });

    expect(result.current.name).toEqual('');
    expect(result.current.email).toEqual('');
    expect(result.current.telephone).toEqual('');
    expect(result.current.categoryId).toEqual('');
  });

  it('should reset contact data with resetFields', async () => {
    const submit = jest.fn();
    const ref = createRef();

    const { result } = renderHook(() => useContactForm(submit, ref));
    await act(() => {
      ref.current.resetFields();
    });

    expect(result.current.name).toEqual('');
    expect(result.current.email).toEqual('');
    expect(result.current.telephone).toEqual('');
    expect(result.current.categoryId).toEqual('');
  });

  it('should display an error message for the name field if it is empty', async () => {
    const submit = jest.fn();
    const ref = createRef();

    const { result } = renderHook(() => useContactForm(submit, ref));

    const e = {
      target: {
        value: ''
      }
    };

    await act(() => {
      result.current.handleNameChange(e);
    });

    expect(result.current.getErrorMessageByFieldName('name')).toEqual(
      'Nome é obrigatório'
    );
  });
  it('should display an error message for the email field if it is empty', async () => {
    const submit = jest.fn();
    const ref = createRef();

    const { result } = renderHook(() => useContactForm(submit, ref));

    const e = {
      target: {
        value: 'email-invalid'
      }
    };

    await act(() => {
      result.current.handleEmailChange(e);
    });

    expect(result.current.getErrorMessageByFieldName('email')).toEqual(
      'Email é inválido'
    );
  });
});
