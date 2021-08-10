import styled from 'styled-components'
import { darken, lighten } from 'polished'

import { ButtonProps } from './typings'

export const Container = styled.button<ButtonProps>`
  background: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : 'transparent'};

  border-radius: 6px;
  border: 0;

  height: ${({ theme }) => theme.sizes.inputHeight};
  width: 130px;

  cursor: pointer;

  box-shadow: ${({ variant }) =>
    variant === 'primary' ? `0px 0px 13px -4px #000000` : ''};

  &:hover {
    transition: background-color 0.3s;
    background: ${({ theme, variant }) =>
      variant !== 'danger' && theme.colors.lightButtonHover};
  }
`

export const Text = styled.p<ButtonProps>`
  font-family: ${({ theme, variant }) =>
    variant !== 'danger' ? theme.fonts.light : theme.fonts.semiBold};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.buttonText : theme.colors[variant]};

  &:hover {
    text-decoration: ${({ variant }) => variant === 'danger' && 'underline'};
  }
`
