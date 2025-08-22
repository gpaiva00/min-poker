import styled from 'styled-components'

export const WaitingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: ${({ theme }) => theme.margins.medium};
`

export const Description = styled.h1`
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  color: ${({ theme }) => theme.colors.smoke};

  text-transform: uppercase;
`
