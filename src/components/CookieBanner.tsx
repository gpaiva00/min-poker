import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  function handleDecline() {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className='fixed bottom-4 right-4 z-50 rounded-lg bg-gray-950 p-4 text-white shadow-lg'>
      <div className='mx-auto flex max-w-2xl flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex-1'>
          <p className='text-sm font-light'>
            Este site utiliza cookies para melhorar sua experiência.
            <br />
            Ao continuar navegando, você concorda com nossa{' '}
            <a href='/privacy-policy' className='underline hover:text-gray-300'>
              Política de Privacidade
            </a>{' '}
            e{' '}
            <a
              href='/terms-of-service'
              className='underline hover:text-gray-300'
            >
              Termos de Uso
            </a>
            .
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button onClick={handleDecline} variant='link' className='text-white'>
            Recusar
          </Button>
          <Button onClick={handleAccept} variant='default'>
            Aceitar
          </Button>
          <button
            onClick={handleDecline}
            className='rounded p-1 transition-colors hover:bg-gray-800'
            aria-label='Fechar banner'
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
