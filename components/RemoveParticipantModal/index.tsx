import React, { FC } from 'react'
import { i18n } from '../../translate/i18n'

import ConfirmModal from '../ConfirmModal'

interface OptionsModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  handlePressConfirm(id?: string): Promise<void>
}

const RemoveParticipantModal: FC<OptionsModalProps> = ({
  toggle,
  setToggleModal,
  handlePressConfirm,
  loading,
}) => (
  <ConfirmModal
    toggle={toggle}
    setToggleModal={setToggleModal}
    title={i18n.t('titles.removeParticipant')}
    onPressConfirm={handlePressConfirm}
    loading={loading}
    description={i18n.t('descriptions.confirmRemoveParticipant')}
    primaryButtonLabel={i18n.t('buttons.remove')}
  />
)

export default RemoveParticipantModal
