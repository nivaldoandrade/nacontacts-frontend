import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    /* word-break: break-all; */
    overflow-wrap: anywhere;
  }
`;
