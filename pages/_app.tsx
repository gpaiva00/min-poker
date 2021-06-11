import React, { FC, useCallback } from 'react'

import { AppProps } from 'next/app'

import { AnimateSharedLayout } from 'framer-motion'

import GlobalStyle from '../styles/global'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import lightTheme from '../styles/themes/light'
import darkTheme from '../styles/themes/dark'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { usePersistedState } from '../hooks'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', darkTheme)

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme)
  }, [setTheme, theme.title])

  return (
    <AnimateSharedLayout>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </ThemeProvider>
    </AnimateSharedLayout>
  )
}

export default MyApp
