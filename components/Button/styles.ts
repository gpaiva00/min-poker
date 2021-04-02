import styled from 'styled-components'
import { ButtonProps } from './typings'

export const Container = styled.button<ButtonProps>`
  background: ${({ theme }) => theme.colors.text};

  color: ${({ theme, variant }) => theme.colors[variant]};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  border-radius: 6px;
  border: 0;

  height: ${({ theme }) => theme.sizes.inputHeight};
  width: 130px;
`

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.lightText}
`
