import { toast, ToastProps } from 'react-toastify'

interface ToastComponentProps {
  type?: 'error' | 'warning'
  message: string
}

const toastConfig: ToastProps = {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
}

const Toast = ({ type, message }: ToastComponentProps) => {
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
