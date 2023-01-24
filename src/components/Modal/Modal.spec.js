import { fireEvent, screen } from '@testing-library/react';
import { Modal } from '.';
import { customRender } from '../../utils/customRender';

import theme from '../../assets/styles/themes/default';

describe('Modal Component', () => {
  it('renders correctly when isVisible is true', () => {
    const title = 'test-title';

    customRender(
      <Modal isVisible title={title} onCancel={() => {}} onConfirm={() => {}} />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('does not render when isVisible is false', () => {
    const { container } = customRender(
      <Modal
        isVisible={false}
        title="title"
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
  it('calls OnCancel when button is clicked', () => {
    const onCancelMocked = jest.fn();

    customRender(
      <Modal
        isVisible
        title="title"
        onCancel={onCancelMocked}
        onConfirm={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onCancelMocked).toHaveBeenCalled();
  });
  it('calls onConfirm when button is clicked', () => {
    const onCofirmMocked = jest.fn();

    customRender(
      <Modal
        isVisible
        title="title"
        onConfirm={onCofirmMocked}
        onCancel={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Confirmar'));

    expect(onCofirmMocked).toHaveBeenCalled();
  });
  it('should renders title with danger color when danger is true', () => {
    const title = 'test-title';

    customRender(
      <Modal
        isVisible
        title={title}
        onConfirm={() => {}}
        onCancel={() => {}}
        danger
      />
    );

    expect(screen.getByText(title)).toHaveStyle(
      `color: ${theme.colors.danger.main}`
    );
  });
});
