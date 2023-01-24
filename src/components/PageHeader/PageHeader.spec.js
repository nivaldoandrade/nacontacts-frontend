import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PageHeader } from '.';
import { customRender } from '../../utils/customRender';

// jest.mock('react-router-dom', () => ({
//   Link: jest.fn().mockReturnValue(<div />)
// }));

describe('PageHeader Component', () => {
  it('renders correctly', () => {
    const title = 'title-header';

    customRender(<PageHeader title={title} />, { wrapper: BrowserRouter });

    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('should navigate to back when link is clicked', () => {
    customRender(<PageHeader title="title" />, { wrapper: BrowserRouter });

    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('href')).toBe('/');
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });
});
