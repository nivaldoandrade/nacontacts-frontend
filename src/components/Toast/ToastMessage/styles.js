import styled, { css } from 'styled-components';

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success.main};
  `
};

export const Container = styled.div`
  background-color: green;
  padding: 16px 32px;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => containerVariants[type] || containerVariants.default};

  img {
    margin-right: 8px;
  }

  & + & {
    margin-top: 12px;
  }
`;
