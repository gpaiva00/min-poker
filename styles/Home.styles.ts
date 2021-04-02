import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-top: 15%;
  height: 100%;
  padding-bottom: ${({ theme }) => theme.margins.medium};
`

export const InstructionText = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${({ theme }) => theme.margins.normal};
`
