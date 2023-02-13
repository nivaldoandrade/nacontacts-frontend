import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Router } from './router';
import { customRender } from './utils/customRender';

describe('Router component', () => {
  it('renders correctly', async () => {
    const route = '/';

    const { container } = customRender(
      <MemoryRouter initialEntries={[route]}>
        <Router />
      </MemoryRouter>
    );

    await act(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
