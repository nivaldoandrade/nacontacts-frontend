import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 110px;
    margin-bottom: 16px;
  }

  span {
    text-align: center;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
