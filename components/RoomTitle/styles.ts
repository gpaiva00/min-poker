import styled from 'styled-components'
import { BsLink } from 'react-icons/bs'
import Button from '../Button'
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

  &:hover {
    ${LinkIcon} {
      color: ${({ theme }) => theme.colors.lightButtonHover};
    }
  }
`

export const TitleContainer = styled.div`
  display: flex;

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
