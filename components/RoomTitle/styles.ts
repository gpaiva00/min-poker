import styled from 'styled-components'
import { BsLink } from 'react-icons/bs'
import { DefaultTitle } from '../../styles/global'

export const LinkIcon = styled(BsLink)`
  margin-left: 3px;
  cursor: pointer;
`

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.margins.m};
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    ${LinkIcon} {
      color: ${({ theme }) => theme.colors.lightButtonHover};
    }
  }
`

export const Title = styled(DefaultTitle)`
  text-transform: none;
  cursor: pointer;
`
