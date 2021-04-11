import React, { FC } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

import { Title, Header, CloseIcon } from './styles'

interface ModalProps {
  toggle: boolean
  title: string
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  height?: '380' | '480'
}

const Modal: FC<ModalProps> = ({
  toggle,
  title,
  children,
  setToggleModal,
  height = '300',
}) => (
  <Rodal
    animation="slideUp"
    visible={toggle}
    onClose={() => {}}
    showCloseButton={false}
    height={height}
  >
    <Header>
      <Title>{title}</Title>
      <CloseIcon onClick={() => setToggleModal(false)} size={25} />
    </Header>

    {children}
  </Rodal>
)

export default Modal
