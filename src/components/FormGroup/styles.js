import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 1rem;
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      right: 16px;
      top: calc(50% - 8px);
    }
  }

  small {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.danger.main};
    margin-top: 8px;
  }
`;
