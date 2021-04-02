import styled from 'styled-components'
import { ContainerProps, InputProps } from './typings'

export const Container = styled.div<ContainerProps>`
  border-color: ${({ variant, theme }) => variant === 'primary' ? theme.colors.smoke : theme.colors.danger};
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;

  padding: 0 10px;
  height: ${({ theme }) => theme.sizes.inputHeight};
  width: 300px;
  margin-right: ${({ theme }) => theme.margins.normal};
`

export const StyledInput = styled.input<ContainerProps>`
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};

  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  outline-style: none;
`
