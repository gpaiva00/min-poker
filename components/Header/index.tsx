import React, { FC, useEffect, useState } from 'react';

import Link from 'next/link'

import { BsLink } from 'react-icons/bs'

import { Container, Title, OptionsContainer, TitleContainer, MinText, RoomTitle, RoomTitleContainer } from './styles'

interface HeaderProps {
  showRoomTitle?: boolean;
  roomTitle?: string;
}

const Header: FC<HeaderProps> = ({ showRoomTitle, roomTitle }) => {
  // const router = useRouter()


  return (
    <>
      { showRoomTitle &&
          ( <RoomTitleContainer>
              <RoomTitle>{roomTitle}</RoomTitle>
              <BsLink size={26}/>
            </RoomTitleContainer>
          )
        }
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
