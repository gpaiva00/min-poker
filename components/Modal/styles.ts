import styled from 'styled-components'

import { Input as OriginalInput, Button as OriginalButton } from '..'
import { IoCloseOutline } from 'react-icons/io5/'

export const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  /* background: lightgreen; */
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.s};

  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.modalLabel};
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.margins.s};
`

export const CloseIcon = styled(IoCloseOutline)`
  color: ${({ theme }) => theme.colors.smoke};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.modalLabel};
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin-top: ${({ theme }) => theme.margins.xs};
  width: 100%;
`
export const Input = styled(OriginalInput)`
  width: 100%;
  margin-right: 0;
`

export const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.colors.modalLabel};

  margin-bottom: ${({ theme }) => theme.margins.xs};
`

export const DefaultButton = styled(OriginalButton)`
  width: 100%;
`
