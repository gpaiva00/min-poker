import React, { FC } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Link from 'next/link'

import Toast from '../Toast'

import {
  Container,
  TitleContainer,
  RoomTitle,
  RoomTitleContainer,
  HeaderImage,
  OptionsContainer,
  Options,
  OptionsIcon,
  LinkIcon,
} from './styles'
import { returnInviteLink } from '../../utils'

interface HeaderProps {
  roomTitle?: string
  roomId?: string | string[]
  setToggleModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({ roomTitle, roomId, setToggleModal }) => {
  const inviteLink = returnInviteLink(roomId)

  return (
    <Container>
      <Link href="/">
        <TitleContainer>
          {/* <MinText>min</MinText>
          <Title>POKER</Title> */}
          <HeaderImage src="/minPoker3.png" />
        </TitleContainer>
      </Link>
      {roomTitle && (
        <OptionsContainer>
          <CopyToClipboard
            text={inviteLink}
            onCopy={() =>
              Toast({ message: 'Invitation link copied to your clipboard.' })
            }
          >
            <RoomTitleContainer>
              <RoomTitle>{roomTitle}</RoomTitle>
              <LinkIcon size={26} />
            </RoomTitleContainer>
          </CopyToClipboard>
          <Options onClick={() => setToggleModal(true)}>
            <OptionsIcon size={26} />
          </Options>
        </OptionsContainer>
      )}
    </Container>
  )
}

export default Header
