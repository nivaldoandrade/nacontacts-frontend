import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid transparent;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
