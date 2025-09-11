import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-t border-gray-100 bg-white px-4 py-6'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='flex items-center space-y-2'>
          <div className='text-xs text-gray-500'>
            © {currentYear} minPoker. Todos os direitos reservados.
          </div>
        </div>
        <div className='flex space-x-4 text-xs'>
          <Link to='/privacy-policy' className='text-gray-500 hover:underline'>
            Política de Privacidade
          </Link>
          <Link
            to='/terms-of-service'
            className='text-gray-500 hover:underline'
          >
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  )
}
