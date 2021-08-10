import styled from 'styled-components'

export const WaitingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const Description = styled.h1`
  font-family: ${({ theme }) => theme.fonts.light};
  font-weight: lighter;
  font-size: ${({ theme }) => theme.fontSizes.s};

  color: ${({ theme }) => theme.colors.smoke};

  text-transform: uppercase;
`
