import styled from 'styled-components'

import { lighten } from 'polished'
import { ImCog } from 'react-icons/im'
import { BsLink } from 'react-icons/bs'
import { LIGHTEN_AMOUNT_HIGH, LIGHTEN_AMOUNT_LOW } from '../../constants'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ theme }) => theme.margins.normal};
  padding-bottom: ${({ theme }) => theme.margins.normal};
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.big};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`

export const LinkIcon = styled(BsLink)`
  margin-left: 5px;
`

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Options = styled.div`
  margin-left: ${({ theme }) => theme.margins.medium};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.lightButtonHover};
  }

  @media (max-width: 768px) {
    margin-left: ${({ theme }) => theme.margins.normal};
  }
`

export const OptionsIcon = styled(ImCog)``

export const TitleContainer = styled.div`
  cursor: pointer;
`
export const HeaderImage = styled.img`
  position: absolute;
  top: 0;
  width: 175px;
  margin-top: ${({ theme }) => theme.margins.small};

  background: white;
  padding: 5px;
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 120px;
  }
`

export const RoomTitleContainer = styled.div`
  display: flex;
  justify-content: center;

  cursor: pointer;

  &:hover {
    ${LinkIcon} {
      color: ${({ theme }) => theme.colors.lightButtonHover};
    }
  }
`

export const RoomTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  display: flex;
  align-self: center;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`

export const MinText = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.smoke};
`
