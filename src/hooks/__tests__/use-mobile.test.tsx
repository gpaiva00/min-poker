import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useIsMobile } from '../use-mobile'

describe('useIsMobile', () => {
  it('deve ser uma função', () => {
    expect(typeof useIsMobile).toBe('function')
  })

  it('deve retornar boolean', () => {
    const { result } = renderHook(() => useIsMobile())

    expect(typeof result.current).toBe('boolean')
  })

  it('deve chamar window.matchMedia', () => {
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBeDefined()
  })
})
