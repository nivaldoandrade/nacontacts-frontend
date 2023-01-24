import { ToastContainer } from '.';
import { customRender } from '../../../utils/customRender';

describe('ToastContainer Component', () => {
  it('renders correctly', () => {
    const { container } = customRender(<ToastContainer />);
    expect(container).toMatchSnapshot();
  });
});
