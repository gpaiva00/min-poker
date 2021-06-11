import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @font-face {
      font-family: 'regular';
      src: url('/fonts/DasaSans-Regular.ttf');
  }

  @font-face {
      font-family: 'medium';
      src: url('/fonts/DasaSans-Medium.ttf');
  }

  @font-face {
      font-family: 'bold';
      src: url('/fonts/DasaSans-Bold.ttf');
  }

  @font-face {
      font-family: 'bold-italic';
      src: url('/fonts/DasaSans-BoldItalic.ttf');
  }

  @font-face {
      font-family: 'semi-bold';
      src: url('/fonts/DasaSans-Semibold.ttf');
  }

  @font-face {
      font-family: 'light';
      src: url('/fonts/DasaSans-Light.ttf');
  }

  @font-face {
      font-family: 'light-italic';
      src: url('/fonts/DasaSans-LightItalic.ttf');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  p,h1 {
    user-select: none;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: 'regular';

    overflow: auto;
  }

  span {
    margin: 0;
    padding: 0 3px;
  }
`
