import styled from 'styled-components'

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
    /* margin: 0; */
  }

  /* background: darkgray; */
`

export const WaitingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: ${({ theme }) => theme.margins.medium};

  /* background: lightgray; */
`

export const Waiting = styled.h1`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  color: ${({ theme }) => theme.colors.smoke};

  text-transform: uppercase;
`

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 55%;
  /* background: lightblue; */

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;

  /* background: lightblue; */

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.small};

  margin-bottom: ${({ theme }) => theme.margins.normal};
  margin-left: 100px;
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`
