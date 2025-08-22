import React, { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { STORAGE_THEME_KEY } from '../../constants'
import { usePersistedState } from '../../hooks'

import { DefaultTheme } from 'styled-components'
import { ThemeIcon, ThemeMode } from './styles'
import lightTheme from '../../styles/themes/light'
import darkTheme from '../../styles/themes/dark'

export const ThemeButton: FC = () => {
  const { storeItem, getStoredItem } = usePersistedState()
  const router = useRouter()

  const storedTheme: DefaultTheme = getStoredItem(STORAGE_THEME_KEY)

  const handleToggleTheme = useCallback(() => {
    storeItem(
      STORAGE_THEME_KEY,
      storedTheme.title === 'light' ? darkTheme : lightTheme
    )
    router.reload()
  }, [storedTheme])

  return (
    <ThemeMode onClick={handleToggleTheme}>
      <ThemeIcon size={30} />
    </ThemeMode>
  )
}
