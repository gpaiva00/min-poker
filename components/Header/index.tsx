import React, { FC } from 'react'
import MinPokerTitle from '../MinPokerTitle'

import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import theme from '../../styles/themes/light'
import {
  Container,
  OptionsContainer,
  Options,
  OptionsIcon,
  UserAvatar,
  SignInButton,
} from './styles'
import Loading from '../Loading'
import { Session } from 'next-auth'
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
  session: Session
}

const Header: FC<HeaderProps> = ({
  showOptions = false,
  setToggleOptionsModal,
  setToggleAccountModal,
  user,
  loading,
  session,
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
        {loading && <Loading color={theme.colors.primary} />}
        {!loading && !session && (
          <SignInButton loading={loading} onClick={handleSignIn}>
            Entrar
          </SignInButton>
        )}

        {session && (
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
