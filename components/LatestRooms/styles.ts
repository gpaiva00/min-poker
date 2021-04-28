import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  ${({ theme }) => `margin: ${theme.margins.big} ${theme.margins.normal}`};

  @media (max-width: 768px) {
    margin-top: ${({ theme }) => theme.margins.normal};
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  text-transform: uppercase;
`

export const ItemsContainer = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => `margin: ${theme.margins.small} ${theme.margins.normal}`};
`

export const Item = styled.a`
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};

  margin-bottom: ${({ theme }) => theme.margins.small};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
