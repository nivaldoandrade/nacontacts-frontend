import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

import { ButtonContainer, Form } from './styles';
import { useContactForm } from './useContactForm';

function ContactFormWrapper({ buttonLabel, onSubmit }, ref) {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    telephone,
    handleTelephoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={(e) => handleSubmit(e)} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome"
          value={name}
          onChange={(e) => handleNameChange(e)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="Email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={telephone}
          onChange={(e) => handleTelephoneChange(e)}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          data-testid="select-element"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export const ContactForm = forwardRef(ContactFormWrapper);

ContactFormWrapper.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
