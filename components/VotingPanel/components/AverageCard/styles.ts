import styled from 'styled-components'

export const AverageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

export const AverageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.light};
  font-weight: lighter;
  font-size: ${({ theme }) => theme.fontSizes.xs};

  margin-bottom: ${({ theme }) => theme.margins.xs};
`

export const AverageValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.boldItalic};
  font-size: ${({ theme }) => theme.fontSizes.s};
`
