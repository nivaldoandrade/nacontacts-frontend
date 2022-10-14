import PropTypes from 'prop-types';

import { useState } from 'react';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form, ButtonContainer } from './styles';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      name,
      email,
      telephone,
      category
    });
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
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
