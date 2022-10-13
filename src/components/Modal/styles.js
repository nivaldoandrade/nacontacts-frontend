import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const Container = styled.div`
  width: 450px;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  h1 {
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
      margin-right: 8px;
    }
  }
`;
