import styled from 'styled-components';

export const Container = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      transform: rotate(-90deg);
      margin-right: 0.5rem;
    }

    span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  h1 {
    font-size: 1.5rem;
  }
`;
