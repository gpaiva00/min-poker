import React, { FC } from 'react'
import MinPokerTitle from '../MinPokerTitle'

import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

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
  user: {
    name: string
    image: string
  }
  loading?: boolean
}

const Header: FC<HeaderProps> = ({
  showOptions = false,
  setToggleOptionsModal,
  setToggleAccountModal,
  user,
  loading,
}) => {
  const router = useRouter()

  const handleSignIn = async () => {
    router.push(`/signin?redirectTo=${router.asPath}`)
  }

  return (
    <Container>
      <MinPokerTitle />

      <OptionsContainer>
        {showOptions && (
          <Options onClick={() => setToggleOptionsModal(true)}>
            <OptionsIcon size={26} />
          </Options>
        )}
        {!user.name && (
          <SignInButton loading={loading} onClick={handleSignIn}>
            Entrar
          </SignInButton>
        )}

        {user.name && (
          <UserAvatar
            onClick={() => setToggleAccountModal(true)}
            name={user.name}
            src={user.image}
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
