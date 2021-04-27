import 'styled-components'

import theme from './theme'

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    title: string

    colors: {
      lightGreen: string
      darkGreen: string
      background: string
      primary: string
      danger: string
      text: string
      smoke: string
      lightSmoke: string
      timer: string
      lightText: string
      darkText: string
      danger: string
      focus: string
      blue: string
    }

    fonts: {
      light: string
      lightItalic: string
      regular: string
      semiBold: string
      bold: string
      boldItalic: string
      medium: string
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
