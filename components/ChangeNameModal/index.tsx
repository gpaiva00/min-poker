import React, { FC, useState } from 'react'

import Modal from '../Modal'
import { Container, Input, Button } from './styles'

interface ChangeNameModalProps {
  toggle: boolean
  handleChangeName(newUserName: string): Promise<React.ReactText>
  inputValue: string
}

const ChangeNameModal: FC<ChangeNameModalProps> = ({
  toggle,
  inputValue,
  handleChangeName,
}) => {
  const [name, setName] = useState(inputValue)

  return (
    <Modal toggle={toggle} title="type your name">
      <Container>
        <Input value={name} onInput={event => setName(event.target.value)} />

        <Button onClick={() => handleChangeName(name)}>Change name</Button>
      </Container>
    </Modal>
  )
}

export default ChangeNameModal
