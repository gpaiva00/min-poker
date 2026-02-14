import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CookieBanner } from '../CookieBanner'

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

describe('CookieBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true
    })
  })

  it('deve renderizar quando não houver consentimento', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(<CookieBanner />)

    expect(
      screen.getByText(
        /Este site utiliza cookies para melhorar sua experiência/
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Aceitar')).toBeInTheDocument()
    expect(screen.getByText('Recusar')).toBeInTheDocument()
  })

  it('deve ter botão Aceitar', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(<CookieBanner />)

    const acceptButton = screen.getByText('Aceitar')
    expect(acceptButton).toBeInTheDocument()
  })

  it('deve ter botão Recusar', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(<CookieBanner />)

    const declineButton = screen.getByText('Recusar')
    expect(declineButton).toBeInTheDocument()
  })

  it('deve ter links para Política de Privacidade', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(<CookieBanner />)

    const privacyLink = screen.getByRole('link', {
      name: /Política de Privacidade/i
    })
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy')
  })

  it('deve ter links para Termos de Uso', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(<CookieBanner />)

    const termsLink = screen.getByRole('link', { name: /Termos de Uso/i })
    expect(termsLink).toBeInTheDocument()
    expect(termsLink).toHaveAttribute('href', '/terms-of-service')
  })

  it('deve estar posicionado no canto inferior direito', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { container } = render(<CookieBanner />)

    const banner = container.firstChild as HTMLElement
    expect(banner).toHaveClass('fixed')
    expect(banner).toHaveClass('bottom-4')
    expect(banner).toHaveClass('right-4')
  })

  it('deve ter z-index alto para ficar sobre outros elementos', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { container } = render(<CookieBanner />)

    const banner = container.firstChild as HTMLElement
    expect(banner).toHaveClass('z-50')
  })
})
