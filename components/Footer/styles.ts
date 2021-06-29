import styled from 'styled-components'
import { BiMoon } from 'react-icons/bi'

export const Container = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  text-align: center;
  padding: 10px;
`

export const Credits = styled.p`
  font-family: ${({ theme }) => theme.fonts.light};
  font-weight: 200;

  font-size: 0.8rem;
`

export const Name = styled.a`
  color: ${({ theme }) => theme.colors.darkText};
`

export const ThemeMode = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;

  margin-bottom: ${({ theme }) => theme.margins.small};
  margin-right: ${({ theme }) => theme.margins.normal};

  border: 0;
  background: transparent;
  cursor: pointer;
`
export const ThemeIcon = styled(BiMoon)`
  color: ${({ theme }) =>
    theme.title === 'dark' ? theme.colors.white : theme.colors.primary};
`
