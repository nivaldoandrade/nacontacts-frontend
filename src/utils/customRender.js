/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../assets/styles/themes/default';

export const customRender = (ui, options) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
