import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 2rem;

  strong {
    font-size: 24px;
    font-weight: 700;
  }

  a {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    padding: 8px 16px;

    font-weight: 700;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};

    transition: all 0.2s ease-in;

    &:hover {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.primary.main};
      border: 2px solid transparent;
    }
  }
`;
