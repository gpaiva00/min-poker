import React, { FC, useCallback } from 'react'
import { DefaultTheme } from 'styled-components'
import { STORAGE_THEME_KEY } from '../../constants'
import { usePersistedState } from '../../hooks'
import { useRouter } from 'next/router'

import lightTheme from '../../styles/themes/light'
import darkTheme from '../../styles/themes/dark'

import { Container, Credits, Name, ThemeMode, ThemeIcon } from './styles'

interface FooterProps {
  showCredits?: boolean
}

const Footer: FC<FooterProps> = ({ showCredits = true }) => {
  const { storeItem, getStoredItem } = usePersistedState()
  const router = useRouter()

  const storedTheme: DefaultTheme = getStoredItem(STORAGE_THEME_KEY)

  console.log({ storedTheme })

  const handleToggleTheme = useCallback(() => {
    storeItem(
      STORAGE_THEME_KEY,
      storedTheme.title === 'light' ? darkTheme : lightTheme
    )
    router.reload()
  }, [storedTheme])

  return (
    <Container>
      {showCredits && (
        <Credits>
          Designed by{' '}
          <Name href="https://github.com/gpaiva00" target="_blank">
            Gabriel Paiva
          </Name>
        </Credits>
      )}

      <ThemeMode onClick={handleToggleTheme}>
        <ThemeIcon size={30} />
      </ThemeMode>
    </Container>
  )
}

export default Footer
