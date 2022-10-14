import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 1rem;
  }

  small {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.danger.main};
    margin-top: 8px;
  }
`;
