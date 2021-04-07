import React, { FC } from 'react'

import { AppProps } from 'next/app'
// import { useCollectionData } from 'react-firebase-hooks/firestore'

import { AnimateSharedLayout } from 'framer-motion'

import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
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
