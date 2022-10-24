import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;

    strong {
      display: block;
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      margin-bottom: 8px;
    }
  }
`;
