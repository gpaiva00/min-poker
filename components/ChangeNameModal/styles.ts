import styled from 'styled-components'
import { Input as OriginalInput, Button as OriginalButton } from '..'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 78%;
`

export const Input = styled(OriginalInput)`
  width: 100%;
  margin-right: 0;
`

export const Button = styled(OriginalButton)`
  width: 100%;
`
