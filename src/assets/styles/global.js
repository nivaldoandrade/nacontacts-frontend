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
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  body, input, button {
    font: 400 1rem 'Sora', sans-serif;
    color: black;
  }

  button  {
    cursor: pointer;
  }

`;
