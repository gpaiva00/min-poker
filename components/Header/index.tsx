import React, { FC } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { firebaseAnalytics } from '../../services/firebase'

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
import { i18n } from '../../translate/i18n'
import { returnInviteLink } from '../../utils'
import { usePersistedState } from '../../hooks'
import { DefaultTheme } from 'styled-components'
import { DEFAULT_THEME_OBJ, STORAGE_THEME_KEY } from '../../constants'
import Skeleton from 'react-loading-skeleton'

interface HeaderProps {
  roomTitle?: string
  roomId?: string | string[]
  setToggleModal?: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
}

const Header: FC<HeaderProps> = ({
  roomTitle,
  roomId,
  setToggleModal,
  isLoading,
}) => {
  const inviteLink = returnInviteLink(roomId)

  const { getStoredItem } = usePersistedState()
  const storedTheme: DefaultTheme = getStoredItem(STORAGE_THEME_KEY)

  const { title: themeTitle } = storedTheme ?? DEFAULT_THEME_OBJ

  return (
    <Container>
      <Link href="/">
        <TitleContainer>
          {/* <HeaderImage
            src={
              themeTitle === 'dark' ? '/minPoker3_teste.png' : '/minPoker3.png'
            }
          /> */}
          <HeaderImage src="/minPoker.png" />
        </TitleContainer>
      </Link>
      {roomTitle && (
        <OptionsContainer>
          <CopyToClipboard
            text={inviteLink}
            onCopy={() => {
              firebaseAnalytics().logEvent('invitation_link_copied')
              Toast({ message: i18n.t('toast.invitationLinkCopied') })
            }}
          >
            <RoomTitleContainer>
              {isLoading ? (
                <Skeleton width={150} height={20} />
              ) : (
                <>
                  <RoomTitle>{roomTitle}</RoomTitle>
                  <LinkIcon size={26} />
                </>
              )}
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
