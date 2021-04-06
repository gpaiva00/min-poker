import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  padding-left: ${({ theme }) => theme.margins.normal};
  padding-top: ${({ theme }) => theme.margins.small};
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.big};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`

export const Invite = styled.span`
  cursor: pointer;
`

export const SwitchButton = styled.button`
  border: 0;
  background: transparent;
`

export const ButtonIcon = styled.img`
  width: 40px;
  filter: ${({ theme }) =>
    theme.title === 'dark' ? `invert(60%)` : `invert(0)`};

  cursor: pointer;
`

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Language = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.focus};

  margin-right: 36px;
  cursor: pointer;
`

export const TitleContainer = styled.div``

export const RoomTitleContainer = styled.div`
  position: absolute;
  top: 0;
  padding-top: ${({ theme }) => theme.margins.medium};
  width: 100%;
  display: flex;
  justify-content: center;
`

export const RoomTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  display: flex;
  align-self: center;
  margin-right: ${({ theme }) => theme.margins.small};
  text-transform: uppercase;
`

export const MinText = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.smoke};
`
