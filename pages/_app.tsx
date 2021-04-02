import { FC, useCallback } from 'react'
import { AppProps } from 'next/app'

import { AnimateSharedLayout } from 'framer-motion'

import GlobalStyle from '../styles/global'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import usePersistedState from '../hooks/usePersistedState'
import theme from '../styles/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'


const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  // const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', lightTheme);

  // const toggleTheme = useCallback(() => {
  //   setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  // }, [setTheme, theme.title]);

  return (
    <AnimateSharedLayout>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </AnimateSharedLayout>
  )
}

export default MyApp
