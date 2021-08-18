import React, { FC } from 'react'
import Link from 'next/link'
import MinPokerTitle from '../MinPokerTitle'

import { signIn, useSession, getSession } from 'next-auth/client'

import {
  Container,
  OptionsContainer,
  Options,
  OptionsIcon,
  UserAvatar,
  SignInButton,
} from './styles'
interface HeaderProps {
  setToggleOptionsModal?: React.Dispatch<React.SetStateAction<boolean>>
  setToggleAccountModal?: React.Dispatch<React.SetStateAction<boolean>>
  isLoading?: boolean
  showOptions?: boolean
}

const Header: FC<HeaderProps> = ({
  showOptions = false,
  setToggleOptionsModal,
  setToggleAccountModal,
}) => {
  const [session, loading] = useSession()

  console.warn({ session })

  const handleSignIn = async () => {
    signIn()
  }

  return (
    <Container>
      <Link href="/">
        <MinPokerTitle />
      </Link>

      <OptionsContainer>
        {showOptions && (
          <Options onClick={() => setToggleOptionsModal(true)}>
            <OptionsIcon size={26} />
          </Options>
        )}
        {!session && (
          <SignInButton loading={loading} onClick={handleSignIn}>
            Entrar
          </SignInButton>
        )}

        {session && (
          <UserAvatar
            onClick={() => setToggleAccountModal(true)}
            name={session.user.name}
            src={session.user.image}
            size="50"
            color="black"
            round
          />
        )}
      </OptionsContainer>
    </Container>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default Header
