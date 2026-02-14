import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Footer } from '../Footer'
import { BrowserRouter } from 'react-router-dom'

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar o Footer', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('deve exibir o ano atual', () => {
    const currentYear = new Date().getFullYear()

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(
      screen.getByText(new RegExp(`© ${currentYear}`))
    ).toBeInTheDocument()
  })

  it('deve exibir "minPoker"', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(screen.getByText(/minPoker/)).toBeInTheDocument()
  })

  it('deve exibir "Todos os direitos reservados"', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(screen.getByText(/Todos os direitos reservados/)).toBeInTheDocument()
  })

  it('deve ter link para Política de Privacidade', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const privacyLink = screen.getByRole('link', {
      name: /Política de Privacidade/i
    })
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy')
  })

  it('deve ter link para Termos de Uso', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const termsLink = screen.getByRole('link', { name: /Termos de Uso/i })
    expect(termsLink).toBeInTheDocument()
    expect(termsLink).toHaveAttribute('href', '/terms-of-service')
  })

  it('deve ter estilos de border-top', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('border-t')
    expect(footer).toHaveClass('border-gray-100')
  })

  it('deve ter fundo branco', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-white')
  })

  it('deve ter padding adequado', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('px-4')
    expect(footer).toHaveClass('py-6')
  })

  it('deve centralizar o conteúdo', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const innerDiv = container.querySelector('.flex.flex-col.items-center')
    expect(innerDiv).toBeInTheDocument()
  })

  it('deve ter espaçamento entre os elementos', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const innerDiv = container.querySelector('.flex.flex-col.items-center')
    expect(innerDiv).toHaveClass('space-y-2')
  })

  it('links devem ter efeito hover underline', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const privacyLink = screen.getByRole('link', {
      name: /Política de Privacidade/i
    })
    expect(privacyLink).toHaveClass('hover:underline')

    const termsLink = screen.getByRole('link', { name: /Termos de Uso/i })
    expect(termsLink).toHaveClass('hover:underline')
  })

  it('links devem ter cor text-gray-500', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const privacyLink = screen.getByRole('link', {
      name: /Política de Privacidade/i
    })
    expect(privacyLink).toHaveClass('text-gray-500')

    const termsLink = screen.getByRole('link', { name: /Termos de Uso/i })
    expect(termsLink).toHaveClass('text-gray-500')
  })

  it('deve ter tamanho de fonte text-xs', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const copyrightDiv = container.querySelector('.text-xs.text-gray-500')
    expect(copyrightDiv).toBeInTheDocument()

    const linksContainer = container.querySelector('.flex.space-x-4.text-xs')
    expect(linksContainer).toBeInTheDocument()
  })

  it('deve ter espaçamento entre os links', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const linksContainer = container.querySelector('.flex.space-x-4')
    expect(linksContainer).toBeInTheDocument()
  })
})
