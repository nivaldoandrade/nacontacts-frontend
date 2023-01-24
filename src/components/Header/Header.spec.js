import { screen } from '@testing-library/react';

import { Header } from '.';
import { customRender } from '../../utils/customRender';

describe('Header Component', () => {
  it('renders correctly', () => {
    customRender(<Header />);

    expect(
      screen.getByRole('img', { alt: 'NaContacts Logo' })
    ).toBeInTheDocument();
  });
});
