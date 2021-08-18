import styled from 'styled-components'
import Avatar from 'react-avatar'

import { ImCog } from 'react-icons/im'
import { Button as OriginalButton } from '..'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: ${({ theme }) => theme.margins.xs};
`

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Options = styled.div`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.margins.m};
  &:hover {
    color: ${({ theme }) => theme.colors.lightButtonHover};
  }

  @media (max-width: 768px) {
    margin-left: ${({ theme }) => theme.margins.s};
  }
`

export const OptionsIcon = styled(ImCog)``

export const HeaderImage = styled.img`
  position: absolute;
  top: 0;
  width: 175px;
  margin-top: ${({ theme }) => theme.margins.s};

  background: white;
  padding: 5px;
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 120px;
  }
`

export const UserAvatar = styled(Avatar)`
  cursor: pointer;
  /* box-shadow: 0px 0px 13px -6px #000000; */
  box-shadow: 0px 5px 15px 1px rgba(178, 178, 178, 0.74);
`

export const SignInButton = styled(OriginalButton)`
  width: 100px;
  height: 50px;
`
