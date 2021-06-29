import React, { useEffect, FC, useCallback } from 'react'

import { AppProps } from 'next/app'

import { AnimateSharedLayout } from 'framer-motion'

import GlobalStyle from '../styles/global'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import lightTheme from '../styles/themes/light'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { usePersistedState } from '../hooks'
import { STORAGE_THEME_KEY } from '../constants'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { storeItem, getStoredItem } = usePersistedState()

  const storedTheme: DefaultTheme = getStoredItem(STORAGE_THEME_KEY, lightTheme)

  useEffect(() => {
    storeItem(STORAGE_THEME_KEY, storedTheme)
  }, [storedTheme])

  return (
    <AnimateSharedLayout>
      <ThemeProvider theme={storedTheme}>
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
