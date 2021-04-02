import { FC } from 'react'

import { AppProps } from 'next/app'
// import { useCollectionData } from 'react-firebase-hooks/firestore'

import { AnimateSharedLayout } from 'framer-motion'

import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AnimateSharedLayout>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AnimateSharedLayout>
  )
}

export default MyApp
