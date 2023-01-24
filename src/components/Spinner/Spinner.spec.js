import { screen } from '@testing-library/react';
import { Spinner } from '.';
import { customRender } from '../../utils/customRender';

describe('Spinner Component', () => {
  it('renders correctly', () => {
    customRender(<Spinner size={16} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner').getAttribute('size')).toBe('16');
  });
});
