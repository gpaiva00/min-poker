import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  ${({ theme }) => `margin: ${theme.margins.medium} ${theme.margins.medium}`};
  /* margin-left: ${({ theme }) => theme.margins.medium}; */
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.small};

  text-transform: uppercase;
`

export const ItemsContainer = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => `margin: ${theme.margins.normal} ${theme.margins.normal}`};
`

export const Item = styled.a`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};

  margin-bottom: ${({ theme }) => theme.margins.small};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
