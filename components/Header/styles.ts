import styled from 'styled-components'

import { lighten } from 'polished'
import { ImSpades } from 'react-icons/im'
import { BsLink } from 'react-icons/bs'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* ${({ theme }) => `padding: 0 ${theme.margins.normal}`}; */
  padding: ${({ theme }) => theme.margins.normal};
  padding-bottom: ${({ theme }) => theme.margins.medium};
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
    color: ${({ theme }) => lighten(0.2, theme.colors.text)};
  }
`

export const OptionsIcon = styled(ImSpades)``

export const TitleContainer = styled.div`
  cursor: pointer;
`
export const HeaderImage = styled.img`
  position: absolute;
  top: 0;

  width: 200px;
  margin-top: ${({ theme }) => theme.margins.small};

  @media (max-width: 768px) {
    width: 150px;
  }
`

export const RoomTitleContainer = styled.div`
  display: flex;
  justify-content: center;

  cursor: pointer;

  &:hover {
    ${LinkIcon} {
      color: ${({ theme }) => lighten(0.4, theme.colors.text)};
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
