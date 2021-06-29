import { toast, ToastProps } from 'react-toastify'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { STORAGE_THEME_KEY } from '../../constants'
import { usePersistedState } from '../../hooks'

interface ToastComponentProps {
  type?: 'error' | 'warning'
  message: string
}

const Toast = ({ type, message }: ToastComponentProps) => {
  // TODO dinamizar a cor de fundo da Toast
  const { getStoredItem } = usePersistedState()
  const storedTheme: DefaultTheme = getStoredItem(STORAGE_THEME_KEY)
  console.log({ storedTheme })

  const toastConfig: ToastProps = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    closeButton: false,
  }

  switch (type) {
    case 'warning':
      return toast.warning(message, toastConfig)
    case 'error':
      return toast.error(message, toastConfig)

    default:
      return toast.dark(message, {
        ...toastConfig,
        style: {
          background: storedTheme.colors.toastBackground,
          color: storedTheme.colors.toastTextColor,
        },
      })
  }
}

export default Toast
