import { act, screen } from '@testing-library/react';
import { ToastContainer } from '.';
import { customRender } from '../../../utils/customRender';
import toast from '../../../utils/toast';

describe('ToastContainer Component', () => {
  it('renders correctly', () => {
    const { container } = customRender(<ToastContainer />);

    expect(container).toMatchSnapshot();
  });

  it('should be rendered ToastMessage if there is a message', () => {
    customRender(<ToastContainer />);

    const toastMessage = { type: 'success', text: 'success', duration: 2000 };

    act(() => {
      toast(toastMessage);
    });

    expect(screen.getByText(toastMessage.text)).toBeInTheDocument();
  });
});
