import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  padding: 0 16px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: 0;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  color: #fff;
  font-weight: bold;

  transition: background 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]} !important;
    cursor: not-allowed !important;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background-color: ${theme.colors.danger.dark};

      &:hover {
        background-color: ${theme.colors.danger.light};
      }

      &:active {
        background-color: ${theme.colors.danger.dark};
      }
    `}
`;
