import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  opacity: 0.2;
  border-radius: 1px;
  margin: 16px 0;
`;
