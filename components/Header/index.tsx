import React, { FC } from 'react'
import Link from 'next/link'

import {
  Container,
  TitleContainer,
  Title,
  MinText,
  OptionsContainer,
  Options,
  OptionsIcon,
  UserAvatar,
} from './styles'
interface HeaderProps {
  setToggleOptionsModal?: React.Dispatch<React.SetStateAction<boolean>>
  setToggleAccountModal?: React.Dispatch<React.SetStateAction<boolean>>
  isLoading?: boolean
  showOptions?: boolean
  userName?: string
}

const Header: FC<HeaderProps> = ({
  showOptions = false,
  setToggleOptionsModal,
  setToggleAccountModal,
  userName,
}) => {
  return (
    <Container>
      <Link href="/">
        <TitleContainer>
          <MinText>min</MinText>
          <Title>POKER</Title>
          {/* <HeaderImage src="/minPoker.png" /> */}
        </TitleContainer>
      </Link>

      <OptionsContainer>
        {showOptions && (
          <Options onClick={() => setToggleOptionsModal(true)}>
            <OptionsIcon size={26} />
          </Options>
        )}
        {userName && (
          <UserAvatar
            onClick={() => setToggleAccountModal(true)}
            name={userName}
            size="50"
            color="black"
            round
          />
        )}
      </OptionsContainer>
    </Container>
  )
}

export default Header
