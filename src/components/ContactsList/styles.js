import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  opacity: 0.2;
  border-radius: 1px;
  margin: 16px 0;
`;

export const ListContainer = styled.div`
  header {
    margin-bottom: 8px;

    button {
      background-color: transparent;
      border: 0;
      display: flex;
      align-items: center;

      span {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary.main};
      }

      img {
        margin-left: 8px;
      }
    }
  }
`;

export const Card = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  &:last-child {
    margin-bottom: 16px;
  }

  .info {
    .info-header {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      strong {
        color: #222;
      }

      small {
        background-color: ${({ theme }) => theme.colors.primary.lighter};
        border-radius: 4px;
        margin-left: 8px;
        padding: 4px;

        font-size: 12px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary.main};
        text-transform: uppercase;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
      line-height: 18px;

      & + span {
        margin-top: 4px;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: 0;
      margin-left: 8px;
    }
  }
`;
