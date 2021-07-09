import { toast, ToastProps } from 'react-toastify'
interface ToastComponentProps {
  type?: 'error' | 'warning'
  message: string
}

const Toast = ({ type, message }: ToastComponentProps) => {
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
      return toast.dark(message, toastConfig)
  }
}

export default Toast
