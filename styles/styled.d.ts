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
      lightButtonHover: string
      darkButtonHover: string
      modalLabel: string
      inputBorder: string
      modalButtonBackground: string
      toastBackground: string
      toastTextColor: string
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
      xs: string
      s: string
      m: string
      l: string
      xl: string
    }

    margins: {
      xs: string
      s: string
      m: string
      l: string
      xl: string
    }

    paddings: {
      s: string
    }

    sizes: {
      inputHeight: string
    }
  }
}
