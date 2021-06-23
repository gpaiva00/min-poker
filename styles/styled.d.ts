import 'styled-components'

import theme from './themes/light'

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    title: string

    colors: {
      background: string
      primary: string
      danger: string
      text: string
      inputText: string
      smoke: string
      lightSmoke: string
      lightText: string
      darkText: string
      focus: string
      white: string
      buttonText: string
      modalLabel: string
      inputBorder: string
      modalButtonBackground: string
    }

    fonts: {
      light: string
      lightItalic: string
      regular: string
      semiBold: string
      bold: string
      boldItalic: string
    }

    fontSizes: {
      small: string
      regular: string
      medium: string
      big: string
      biggest: string
    }

    margins: {
      small: string
      normal: string
      medium: string
      big: string
    }

    paddings: {
      normal: string
    }

    sizes: {
      inputHeight: string
    }
  }
}
