import React, { FC, useEffect, useState } from 'react'

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
    <>
      {showRoomTitle && (
        <RoomTitleContainer>
          <RoomTitle>{roomTitle}</RoomTitle>
          {imHost && (
            <CopyToClipboard
              text={inviteLink}
              onCopy={() =>
                window.alert('Invite link was copied to your clipboard!')
              }
            >
              <Invite>
                <BsLink size={26} />
              </Invite>
            </CopyToClipboard>
          )}
        </RoomTitleContainer>
      )}
      <Container>
        <Link href="/">
          <TitleContainer>
            <MinText>min</MinText>
            <Title>POKER</Title>
          </TitleContainer>
        </Link>
      </Container>
    </>
  )
}

export default Header
