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
    <div className='fixed bottom-4 right-4 bg-gray-950 text-white p-4 shadow-lg z-50 rounded-lg'>
      <div className='max-w-2xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
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
            className='p-1 hover:bg-gray-800 rounded transition-colors'
            aria-label='Fechar banner'
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
