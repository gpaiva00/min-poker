import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const isRendered = typeof window !== 'undefined'

  const [state, setState] = useState(() => {

    if (isRendered) {
      console.log('rendered');

      const storedValue = localStorage.getItem(key)

      if (storedValue) return JSON.parse(storedValue)
    }

    return initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state, isRendered])

  return [state, setState]
}

export default usePersistedState
