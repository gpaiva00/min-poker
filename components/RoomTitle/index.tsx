import React, { FC } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { firebaseAnalytics } from '../../services/firebase'
import { i18n } from '../../translate/i18n'
import { returnInviteLink } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import Toast from '../Toast'
import {
  LinkIcon,
  DeleteButtonContainer,
  DeleteRoom,
  Container,
  Title,
  TitleContainer,
} from './styles'
import { DefaultTitle } from '../../styles/global'
import { Button } from '..'

interface RoomTitleProps {
  roomId: string
  roomName: string
  isLoading: boolean
  imHost: boolean
  handleDeleteRoom(): void
  handleExitRoom(): void
}

const RoomTitle: FC<RoomTitleProps> = ({
  roomId,
  roomName,
  isLoading,
  handleDeleteRoom,
  handleExitRoom,
  imHost,
}) => {
  const inviteLink = returnInviteLink(roomId)

  return (
    <CopyToClipboard
      text={inviteLink}
      onCopy={() => {
        firebaseAnalytics().logEvent('invitation_link_copied')
        Toast({ message: i18n.t('toast.invitationLinkCopied') })
      }}
    >
      <Container>
        {isLoading ? (
          <Skeleton width={150} height={20} />
        ) : (
          <>
            <TitleContainer>
              <Title>{roomName}</Title>
              <LinkIcon size={26} />
            </TitleContainer>
            <>
              {isLoading ? (
                <Skeleton width={200} height={25} />
              ) : (
                <>
                  {imHost ? (
                    <Button
                      loading={isLoading}
                      onClick={handleDeleteRoom}
                      variant="danger"
                    >
                      {i18n.t('buttons.deleteRoom')}
                    </Button>
                  ) : (
                    <Button
                      loading={isLoading}
                      onClick={handleExitRoom}
                      variant="danger"
                    >
                      {i18n.t('buttons.exitRoom')}
                    </Button>
                  )}
                </>
              )}
            </>
          </>
        )}
      </Container>
    </CopyToClipboard>
  )
}

export default RoomTitle
