import styled from 'styled-components'

export const Container = styled.div`
  cursor: pointer;
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.l};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`

export const MinText = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
`
