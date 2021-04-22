import React, { FC } from 'react'

import Modal from '../Modal'

import { Container, Button, Description, ButtonsContainer } from './styles'

interface OptionsModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  title: string
  description: string
  onPressConfirm(): void
}

const ConfirmModal: FC<OptionsModalProps> = ({
  toggle,
  setToggleModal,
  loading,
  title,
  description,
  onPressConfirm,
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
          <Button loading={loading} onClick={() => setToggleModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" loading={loading} onClick={onPressConfirm}>
            Remove
          </Button>
        </ButtonsContainer>
      </Container>
    </Modal>
  )
}

export default ConfirmModal
