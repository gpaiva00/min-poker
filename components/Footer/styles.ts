import styled from 'styled-components'

export const Container = styled.div`
 position: absolute;
 bottom: 0;

 width: 100%;
 text-align: center;
 padding: 10px;
`

export const Credits = styled.p`
  font-family: ${({ theme }) => theme.fonts.light};
  font-weight: 200;

  font-size: 0.8rem;
`

export const Name = styled.a`
  color: ${({ theme }) => theme.colors.text}
`
