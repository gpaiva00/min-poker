import styled from 'styled-components'
import { darken, lighten } from 'polished'

import { ButtonProps } from './typings'

export const Container = styled.button<ButtonProps>`
  background: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : 'transparent'};

  font-size: ${({ theme }) => theme.fontSizes.regular};
  border-radius: 6px;
  border: 0;

  height: ${({ theme }) => theme.sizes.inputHeight};
  width: 130px;

  cursor: pointer;

  &:hover {
    background: ${({ theme, variant }) =>
      variant !== 'danger' && theme.colors.lightButtonHover};
  }
`

export const Text = styled.p<ButtonProps>`
  font-family: ${({ theme, variant }) =>
    variant !== 'danger' ? theme.fonts.light : theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.buttonText : theme.colors[variant]};

  &:hover {
    text-decoration: ${({ variant }) => variant === 'danger' && 'underline'};
  }
`
