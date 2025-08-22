import styled from 'styled-components'
import { HeaderImage } from '../Header/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 745px;

  margin-left: ${({ theme }) => theme.margins.medium};

  @media (max-width: 768px) {
    height: 100vh;
    margin-left: 0;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: ${({ theme }) => theme.margins.medium};
`

export const MinPokerImage = styled(HeaderImage)`
  position: relative;
  width: 300px;
  opacity: 0.2;
`
