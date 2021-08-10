import styled from 'styled-components'
import { Container as ButtonContainer } from '../../components/Button/styles'
import { Container as InputComponentContainer } from '../../components/Input/styles'

export const InstructionText = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.s};
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${({ theme }) => theme.margins.s};

  @media (max-width: 768px) {
    flex-direction: column;

    ${ButtonContainer} {
      margin-top: ${({ theme }) => theme.margins.s};
      width: 100%;
    }

    ${InputComponentContainer} {
      margin: 0;
      width: 100%;
    }
  }
`
