import styled from 'styled-components'
import { lighten } from 'polished'

import { IoCloseOutline } from 'react-icons/io5/'
import { LIGHTEN_AMOUNT_HIGH } from '../../constants'

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.modalLabel};
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
    color: ${({ theme }) => theme.colors.modalLabel};
  }
`
