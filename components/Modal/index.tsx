import React, { FC } from 'react'

import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

import { Title } from './styles'

interface ModalProps {
  toggle: boolean
  title: string
}

const Modal: FC<ModalProps> = ({ toggle, title, children }) => (
  <Rodal
    animation="slideUp"
    visible={toggle}
    onClose={() => {}}
    showCloseButton={false}
  >
    <Title>{title}</Title>

    {children}
  </Rodal>
)

export default Modal
