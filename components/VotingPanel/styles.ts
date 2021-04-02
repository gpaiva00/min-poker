import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 745px;

  margin-left: ${({ theme }) => theme.margins.medium};

  /* background: lightgray; */
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

  /* height: 80%; */
  width: 55%;
  margin-top: ${({ theme }) => theme.margins.medium};
  /* background: lightblue; */
`

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.small};

  margin-bottom: ${({ theme }) => theme.margins.normal};
  margin-left: ${({ theme }) => theme.margins.medium};
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`
