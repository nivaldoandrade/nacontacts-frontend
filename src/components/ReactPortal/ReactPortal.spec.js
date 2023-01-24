import { render, screen } from '@testing-library/react';
import { ReactPortal } from '.';
import { customRender } from '../../utils/customRender';

describe('ReactPortal Component', () => {
  it('renders correctly', () => {
    const containerId = 'test-react-portal';

    customRender(
      <ReactPortal containerId={containerId}>
        <div>react-portal</div>
      </ReactPortal>
    );

    expect(screen.getByText('react-portal')).toBeInTheDocument();
  });

  it('should not create React Portal with existing ContainerId', () => {
    const containerId = 'test-react-portal';

    const container = document.createElement('div');
    container.setAttribute('id', 'containerId');
    document.body.appendChild(container);

    render(
      <ReactPortal containerId={containerId}>
        <div>react-portal</div>
      </ReactPortal>
    );

    expect(screen.getByText('react-portal')).toBeInTheDocument();
  });
});
