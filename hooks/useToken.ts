import { useState } from 'react'

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken?.token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (token: string) => {
    localStorage.setItem('token', JSON.stringify({ token }))
    setToken(token)
  }

  return { token, setToken: saveToken }
}
