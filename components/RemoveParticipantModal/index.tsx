import React, { FC } from 'react'

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
    title="Remove participant"
    onPressConfirm={handlePressConfirm}
    loading={loading}
    description="Are you sure you want to remove this participant?"
  />
)

export default RemoveParticipantModal
