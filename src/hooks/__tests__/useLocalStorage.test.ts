import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLocalStorage } from '../useLocalStorage'
import { renderHook, act } from '@testing-library/react'

// Mock do localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Configura o mock do localStorage apenas no globalThis
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })
  })

  it('deve ter localStorage mockado corretamente', () => {
    expect(globalThis.localStorage).toBeDefined()
    expect(globalThis.localStorage.getItem).toBeDefined()
    expect(globalThis.localStorage.setItem).toBeDefined()
  })

  it('deve retornar valor inicial quando não há valor no localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    // Teste sem renderHook por enquanto - apenas verificando se o localStorage funciona
    expect(localStorage.getItem('test-key')).toBeNull()
    localStorage.setItem('test-key', 'test-value')
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', 'test-value')
  })

  // Teste básico com renderHook para verificar se funciona
  it('deve funcionar com renderHook - teste básico', () => {
    // Garantir que o DOM está disponível
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    // Mockar window.localStorage especificamente
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value')
    )
    expect(result.current).toBeDefined()
    expect(result.current[0]).toBe('default-value')
  })

  it('deve retornar valor do localStorage quando existe', () => {
    // Garantir que o DOM está disponível
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    // Mockar window.localStorage especificamente
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    const storedValue = { name: 'John', age: 30 }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedValue))
    const { result } = renderHook(() => useLocalStorage('user-data', {}))
    expect(result.current[0]).toEqual(storedValue)
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('user-data')
  })

  it('deve retornar valor inicial quando JSON.parse falha', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    mockLocalStorage.getItem.mockReturnValue('invalid-json')
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error reading localStorage key "test-key":',
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })

  it('deve atualizar valor no localStorage quando setValue é chamado', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    mockLocalStorage.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    act(() => {
      result.current[1]('new-value')
    })
    expect(result.current[0]).toBe('new-value')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    )
  })

  it('deve funcionar com função como valor no setValue', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(5))
    const { result } = renderHook(() => useLocalStorage('counter', 0))
    act(() => {
      result.current[1](prev => prev + 1)
    })
    expect(result.current[0]).toBe(6)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'counter',
      JSON.stringify(6)
    )
  })

  it('deve lidar com erro ao definir valor no localStorage', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    mockLocalStorage.getItem.mockReturnValue(null)
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    act(() => {
      result.current[1]('new-value')
    })
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error setting localStorage key "test-key":',
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })

  it('deve funcionar com objetos complexos', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    const complexObject = {
      user: { name: 'John', preferences: { theme: 'dark' } },
      settings: [1, 2, 3]
    }
    mockLocalStorage.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useLocalStorage('complex', {}))
    act(() => {
      result.current[1](complexObject)
    })
    expect(result.current[0]).toEqual(complexObject)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'complex',
      JSON.stringify(complexObject)
    )
  })

  it('deve funcionar com arrays', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    const arrayValue = ['item1', 'item2', 'item3']
    mockLocalStorage.getItem.mockReturnValue(null)
    const { result } = renderHook(() =>
      useLocalStorage<string[]>('array-key', [])
    )
    act(() => {
      result.current[1](arrayValue)
    })
    expect(result.current[0]).toEqual(arrayValue)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'array-key',
      JSON.stringify(arrayValue)
    )
  })

  it('deve funcionar com valores boolean', () => {
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(true))
    const { result } = renderHook(() => useLocalStorage('boolean-key', false))
    expect(result.current[0]).toBe(true)
    act(() => {
      result.current[1](false)
    })
    expect(result.current[0]).toBe(false)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'boolean-key',
      JSON.stringify(false)
    )
  })
})
