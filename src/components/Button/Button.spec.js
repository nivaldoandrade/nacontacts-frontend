import { screen } from '@testing-library/react';
import { Button } from '.';
import { customRender } from '../../utils/customRender';

import theme from '../../assets/styles/themes/default';

describe('Button Component', () => {
  it('render correctly', () => {
    const childrenTest = 'test-children';

    customRender(<Button>{childrenTest}</Button>);

    expect(screen.getByText(childrenTest)).toBeInTheDocument();
  });
  it('should render Spinner when it is loading', () => {
    const childrenTest = 'test-children';

    customRender(<Button isLoading>{childrenTest}</Button>);

    const spinnerComponent = screen.getByTestId('spinner');

    expect(screen.queryByText(childrenTest)).not.toBeInTheDocument();
    expect(spinnerComponent).toBeInTheDocument();
  });
  it('should change background color if Danger property is true', async () => {
    const childrenTest = 'test-children';

    customRender(<Button danger>{childrenTest}</Button>);

    const buttonElement = screen.getByText(childrenTest);

    expect(buttonElement).toHaveStyle(
      `background-color: ${theme.colors.danger.dark}`
    );
  });
});
