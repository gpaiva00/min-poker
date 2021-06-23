import { toast, ToastProps } from 'react-toastify'
import { usePersistedState } from '../../hooks'

interface ToastComponentProps {
  type?: 'error' | 'warning'
  message: string
}

const toastConfig: ToastProps = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  // styles: {}
}

const Toast = ({ type, message }: ToastComponentProps) => {
  // TODO dinamizar a cor de fundo da Toast

  switch (type) {
    case 'warning':
      return toast.warning(message, {})
    case 'error':
      return toast.error(message, toastConfig)

    default:
      return toast.dark(message, toastConfig)
  }
}

export default Toast
