import styled, { css, keyframes } from 'styled-components';

const FadeIn = keyframes`
  from {opacity: 0}

  to {opacity: 1}
`;

const FadeOut = keyframes`
  from {opacity: 1}

  to {opacity: 0}
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(229, 229, 229, 0.7);

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${FadeIn} 0.3s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${FadeOut} 0.3s forwards;
    `}
`;
