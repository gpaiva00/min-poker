import React, { FC, useEffect } from 'react'

import { AppProps } from 'next/app'

import { AnimateSharedLayout } from 'framer-motion'
import { SkeletonTheme } from 'react-loading-skeleton'

import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'

import lightTheme from '../styles/themes/light'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { firebaseAnalytics } from '../services/firebase'
import { useRouter } from 'next/router'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const routers = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const logEvent = (url: string) => {
        firebaseAnalytics().setCurrentScreen(url)
        firebaseAnalytics().logEvent('screen_view')
      }

      routers.events.on('routeChangeComplete', logEvent)

      logEvent(window.location.pathname)

      return () => {
        routers.events.off('routeChangeComplete', logEvent)
      }
    }
  }, [])

  return (
    <AnimateSharedLayout>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <SkeletonTheme
          color={lightTheme.colors.lightSmoke}
          highlightColor={lightTheme.colors.smoke}
        >
          <Component {...pageProps} />
        </SkeletonTheme>
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
