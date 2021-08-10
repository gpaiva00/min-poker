import React, { FC } from 'react'
import { i18n } from '../../translate/i18n'

import Modal from '../Modal'
import { DefaultButton } from '../Modal/styles'

import { Container, Description, ButtonsContainer } from './styles'

interface OptionsModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  title: string
  description: string
  primaryButtonLabel?: string
  onPressConfirm(): void
}

const ConfirmModal: FC<OptionsModalProps> = ({
  toggle,
  setToggleModal,
  loading,
  title,
  description,
  onPressConfirm,
  primaryButtonLabel,
}) => {
  return (
    <Modal
      height="250"
      toggle={toggle}
      setToggleModal={setToggleModal}
      title={title}
    >
      <Container>
        <Description>{description}</Description>

        <ButtonsContainer>
          <DefaultButton
            loading={loading}
            onClick={() => setToggleModal(false)}
          >
            {i18n.t('buttons.cancel')}
          </DefaultButton>
          <DefaultButton
            variant="danger"
            loading={loading}
            onClick={onPressConfirm}
          >
            {primaryButtonLabel || i18n.t('buttons.confirm')}
          </DefaultButton>
        </ButtonsContainer>
      </Container>
    </Modal>
  )
}

export default ConfirmModal
