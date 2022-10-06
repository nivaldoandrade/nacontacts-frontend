import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 4.12rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 13.75rem;
  }
`;

export const ContainerInputSearchBar = styled.div`
  margin-top: 3.06rem;
  width: 100%;

  input {
    width: 100%;
    height: 3.12rem;
    background-color: #fff;
    border: 0;
    border-radius: 25px;
    padding: 0 1rem;
    outline-color: #5061fc;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
