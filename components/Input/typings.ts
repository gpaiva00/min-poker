import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<any> {
  variant?: 'primary' | 'error'
  value: string
}

export interface ContainerProps {
  variant?: 'primary' | 'error'
}
