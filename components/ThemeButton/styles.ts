import styled from 'styled-components'
import { BiMoon } from 'react-icons/bi'

export const ThemeMode = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;

  margin: ${({ theme }) =>
    `0 ${theme.margins.normal} ${theme.margins.small} 0`};

  border: 0;
  background: transparent;
  cursor: pointer;
`
export const ThemeIcon = styled(BiMoon)`
  color: ${({ theme }) =>
    theme.title === 'dark'
      ? theme.colors.lightButtonHover
      : theme.colors.primary};
`
