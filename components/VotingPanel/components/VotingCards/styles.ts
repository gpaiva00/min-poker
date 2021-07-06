import styled from 'styled-components'

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 55%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding-left: 100px;
  margin-bottom: ${({ theme }) => theme.margins.normal};

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    padding-left: 0;
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  margin-bottom: ${({ theme }) => theme.margins.normal};
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`
