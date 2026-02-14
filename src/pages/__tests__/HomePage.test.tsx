import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HomePage } from '../HomePage'
import { BrowserRouter } from 'react-router-dom'

describe('HomePage', () => {
  it('deve renderizar', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )

    expect(container.firstChild).toBeTruthy()
  })

  it('deve renderizar título', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )

    expect(container.textContent).toContain('Planning Poker')
  })
})
