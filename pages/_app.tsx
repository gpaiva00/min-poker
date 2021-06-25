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
import { STORAGE_THEME_KEY } from '../constants'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { storeItem, getStoredItem } = usePersistedState()

  const storedItem: DefaultTheme = getStoredItem(STORAGE_THEME_KEY, lightTheme)

  const toggleTheme = useCallback(() => {
    storeItem(
      STORAGE_THEME_KEY,
      storedItem.title === 'light' ? darkTheme : lightTheme
    )
  }, [storedItem])

  return (
    <AnimateSharedLayout>
      <ThemeProvider theme={storedItem}>
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
