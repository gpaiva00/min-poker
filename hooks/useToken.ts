import { useState } from 'react'
import { STORAGE_TOKEN_KEY } from '../constants'

export const useToken = () => {
  const isRendered = typeof window !== 'undefined'

  const getToken = () => {
    if (!isRendered) return ''
    const tokenString = localStorage.getItem(STORAGE_TOKEN_KEY)
    const userToken = JSON.parse(tokenString)
    return userToken?.token
  }

  const [token, setToken] = useState<string>(getToken())

  const saveToken = (token: string) => {
    localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify({ token }))
    setToken(token)
  }

  return { token, setToken: saveToken }
}
