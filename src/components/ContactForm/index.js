import PropTypes from 'prop-types';

import { useState } from 'react';
import { useErrors } from '../../hooks/useErrors';

import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import { Form, ButtonContainer } from './styles';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'Email inválido' });
    } else {
      removeError('email');
    }
  }

  function handleTelephoneChange(e) {
    setTelephone(formatPhone(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      name,
      email,
      telephone: telephone.replace(/\D/g, ''),
      category
    });
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome"
          value={name}
          onChange={(e) => handleNameChange(e)}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={(e) => handleEmailChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={telephone}
          onChange={(e) => handleTelephoneChange(e)}
          maxLength="15"
        />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Categorias
          </option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};
