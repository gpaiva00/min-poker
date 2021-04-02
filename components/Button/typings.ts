import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<any> {
  variant?: 'primary' | 'danger';
  loading?: boolean
}
