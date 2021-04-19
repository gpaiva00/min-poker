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

interface HeaderProps {
  showRoomTitle?: boolean
  roomTitle?: string
  roomId?: string | string[]
  setToggleModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({
  showRoomTitle,
  roomTitle,
  roomId,
  setToggleModal,
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
          {/* <MinText>min</MinText>
          <Title>POKER</Title> */}
          <HeaderImage src="/minPoker3.png" />
        </TitleContainer>
      </Link>
      {showRoomTitle && (
        <OptionsContainer>
          <CopyToClipboard
            text={inviteLink}
            onCopy={() =>
              Toast({ message: 'The invitation was copied to your clipboard.' })
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
