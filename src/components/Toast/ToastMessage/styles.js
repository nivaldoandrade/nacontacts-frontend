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

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const FadeOut = keyframes`
    from {
      opacity: 1;
      transform: translateY(0px);
    }

    to {
      opacity: 0;
      transform: translateY(100px);
    }
  `;

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

  animation: ${FadeIn} 0.3s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${FadeOut} 0.3s;
    `}

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
