import { screen } from '@testing-library/react';
import { FormGroup } from '.';
import { customRender } from '../../utils/customRender';

describe('FormGroup Component', () => {
  it('renders correctly', () => {
    customRender(
      <FormGroup>
        <input type="text" />
      </FormGroup>
    );

    const inputElement = screen.getByRole('textbox', { type: 'text' });

    expect(inputElement).toBeInTheDocument();
  });
  it('should render Spinner when it is loading', () => {
    customRender(
      <FormGroup isLoading>
        <input type="text" />
      </FormGroup>
    );

    const spinnerComponent = screen.getByTestId('spinner');

    expect(spinnerComponent).toBeInTheDocument();
  });
  it('should render error if exists error', () => {
    const error = 'error-message';

    customRender(
      <FormGroup error={error}>
        <input type="text" />
      </FormGroup>
    );

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
