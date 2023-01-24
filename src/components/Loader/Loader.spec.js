import { render, screen } from '@testing-library/react';

import { Loader } from '.';
import { customRender } from '../../utils/customRender';

describe('Loader Component', () => {
  it('render correctly when isVisible is true', () => {
    customRender(<Loader isLoading />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('does not renders when isVisible is false', () => {
    const { container } = render(<Loader isLoading={false} />);

    expect(container).toBeEmptyDOMElement();
  });
});
