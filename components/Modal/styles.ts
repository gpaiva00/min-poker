import styled from 'styled-components'
import { lighten } from 'polished'

import { IoCloseOutline } from 'react-icons/io5/'

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  text-transform: uppercase;
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.margins.normal};
`

export const CloseIcon = styled(IoCloseOutline)`
  color: ${({ theme }) => theme.colors.smoke};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => lighten(0.2, theme.colors.text)};
  }
`
