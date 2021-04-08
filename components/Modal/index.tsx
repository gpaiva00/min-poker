import React, { FC } from 'react'
import { IoCloseOutline } from 'react-icons/io5/'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

import { Title, Header, CloseIcon } from './styles'

interface ModalProps {
  toggle: boolean
  title: string
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: FC<ModalProps> = ({ toggle, title, children, setToggleModal }) => (
  <Rodal
    animation="slideUp"
    visible={toggle}
    onClose={() => {}}
    showCloseButton={false}
  >
    <Header>
      <Title>{title}</Title>
      <CloseIcon onClick={() => setToggleModal(false)} size={25} />
    </Header>

    {children}
  </Rodal>
)

export default Modal
