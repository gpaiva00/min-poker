import React, { FC } from 'react'
import { toast } from 'react-toastify'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Link from 'next/link'

import { BsLink } from 'react-icons/bs'

import {
  Container,
  Title,
  TitleContainer,
  MinText,
  RoomTitle,
  RoomTitleContainer,
  Invite,
} from './styles'

interface HeaderProps {
  showRoomTitle?: boolean
  roomTitle?: string
  roomId?: string | string[]
  imHost?: boolean
}

const Header: FC<HeaderProps> = ({
  showRoomTitle,
  roomTitle,
  roomId,
  imHost,
}) => {
  const minPokerURL =
    process.env.NODE_ENV !== 'production'
      ? process.env.MIN_POKER_DEV_URL
      : process.env.MIN_POKER_URL
  const inviteLink = `${minPokerURL}/invitation/${roomId}`

  return (
    <Container>
      <Link href="/">
        <TitleContainer>
          <MinText>min</MinText>
          <Title>POKER</Title>
        </TitleContainer>
      </Link>
      {showRoomTitle && (
        <CopyToClipboard
          text={inviteLink}
          onCopy={() =>
            toast.dark('The link was copied to your clipboard', {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            })
          }
        >
          <RoomTitleContainer>
            <RoomTitle>{roomTitle}</RoomTitle>
            <Invite>
              <BsLink size={26} />
            </Invite>
          </RoomTitleContainer>
        </CopyToClipboard>
      )}
    </Container>
  )
}

export default Header
