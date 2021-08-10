import styled from 'styled-components'

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.margins.m};
  margin-bottom: 0;
  padding-bottom: 0;
`

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => `margin: ${theme.margins.xs} ${theme.margins.s}`};
`

export const Item = styled.a`
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text};

  margin-bottom: ${({ theme }) => theme.margins.xs};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const EmptyLatestRoomsLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.margins.xs};
`
