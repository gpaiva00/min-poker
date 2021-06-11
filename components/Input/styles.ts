import styled from 'styled-components'
import { ContainerProps } from './typings'

export const StyledInput = styled.input<ContainerProps>`
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.inputText};

  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  outline-style: none;
  /* background-color: transparent; */
`

export const Container = styled.div<ContainerProps>`
  border-color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.colors.lightSmoke : theme.colors.danger};
  border-width: 1.5px;
  border-style: solid;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.primary};

  padding: 0 10px;
  height: ${({ theme }) => theme.sizes.inputHeight};
  width: 300px;
  margin-right: ${({ theme }) => theme.margins.normal};

  :focus-within {
    border-color: ${({ variant, theme }) =>
      variant === 'primary' ? theme.colors.text : theme.colors.danger};
  }
`
