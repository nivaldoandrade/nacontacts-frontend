import { fireEvent, screen } from '@testing-library/react';
import { Error } from '.';
import { customRender } from '../../utils/customRender';

describe('Error Component', () => {
  it('renders correctly', () => {
    customRender(
      <Error
        icon={{ src: 'src-icon', alt: 'alt-icon' }}
        message="message"
        onCLick={() => null}
      />
    );

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'src-icon');
    expect(screen.getByText('message')).toBeInTheDocument();
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });
  it('should call try again callback', () => {
    const tryAgainSpy = jest.fn();

    customRender(
      <Error
        icon={{ src: 'src-icon', alt: 'alt-icon' }}
        message="message"
        onCLick={tryAgainSpy}
      />
    );

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(tryAgainSpy).toHaveBeenCalled();
  });
});
