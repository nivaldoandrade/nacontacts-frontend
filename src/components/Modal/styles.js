import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ScaleIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  animation: ${FadeIn} 0.3s ease-out;
`;

export const Container = styled.div`
  width: 450px;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${ScaleIn} 0.3s;

  h1:first-child {
    font-size: 22px;
    margin-bottom: 8px;
    color: ${({ theme, danger }) =>
      danger ? theme.colors.danger.main : 'inherit'};
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 32px;

    .cancel-button {
      background-color: transparent;
      border: 0;
      color: ${({ theme }) => theme.colors.gray[200]};
      margin-right: 16px;

      &[disabled] {
        cursor: not-allowed;
      }
    }
  }
`;
