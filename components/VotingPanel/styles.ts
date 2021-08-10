import styled from 'styled-components'
import { HeaderImage } from '../Header/styles'
import Button from '../../components/Button'
interface PanelProps {
  imHost: boolean
}

export const PANEL_WIDTH = '900px'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;

  width: 90%;
  padding-bottom: ${({ theme }) => theme.margins.m};
`

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.margins.s}`};

  width: 100%;
  /* background: lightcoral; */
`

export const Panel = styled.div<PanelProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ imHost }) => (imHost ? 'flex-start' : 'center')};

  /* background: lightcoral; */

  width: ${PANEL_WIDTH};
  height: 70px;

  border: 1px solid transparent;
  border-radius: 40px;

  box-shadow: 0px 5px 15px 1px rgba(178, 178, 178, 0.74);
`

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: ${({ theme }) => theme.margins.m};
`

export const MinPokerImage = styled(HeaderImage)`
  position: relative;
  width: 300px;
  opacity: 0.2;
`

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  height: 100%;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: ${({ theme }) => theme.margins.xs};

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    padding-left: 0;
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.s};

  margin-bottom: ${({ theme }) => theme.margins.xs};
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* background: darkgray; */
  /* padding: ${({ theme }) => theme.margins.s}; */
  height: 100%;
  width: 120px;
`

export const PlayStopButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const PlayStopButtonText = styled.p`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 12px;
  margin-top: 5px;
`
