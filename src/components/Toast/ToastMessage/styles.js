import styled, { css, keyframes } from 'styled-components';

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

const progressBarAnimation = keyframes`
  from { width: 100%; }
  to { width: 0; }
`;

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

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fff;
    animation-name: ${progressBarAnimation};
    animation-duration: ${({ duration }) => `${duration}ms`};
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
`;
