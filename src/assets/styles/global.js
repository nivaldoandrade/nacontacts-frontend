import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

	* {
		margin: 0;
    padding: 0;
    box-sizing: border-box;
	}

  @media (max-witdh: 1080px) {
    html {
      font-size: 93.75%; //16px
    }
  }

  @media (max-width: 720opx) {
    html {
      font-size: 87.5%; //15px
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
  }

  body, input, button, select {
    font: 400 1rem 'Sora', sans-serif;
    color: ${({ theme }) => theme.colors.gray[900]};
  }

  button  {
    cursor: pointer;
  }

`;
