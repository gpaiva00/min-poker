import { useState, useEffect, Dispatch, SetStateAction } from 'react'

// type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState() {
  const isRendered = typeof window !== 'undefined'

  const getStoredItem = (key: string, initialState?: object) => {
    if (isRendered) {
      const storedValue = localStorage.getItem(key)

      if (storedValue) return JSON.parse(storedValue)
    }

    return initialState
  }

  const storeItem = (key: string, item: object | string) => {
    localStorage.setItem(key, JSON.stringify(item))
  }

  return { getStoredItem, storeItem }
}

export default usePersistedState
