import styled from 'styled-components'
import { Footer } from '../components'
import { Container } from '../components/Footer/styles'

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;

  /* margin-top: 50px; */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
