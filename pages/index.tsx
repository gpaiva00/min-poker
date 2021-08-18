import React, { FC, useState } from 'react'

import { PageContainer } from '../styles/Home.styles'

import { Footer, Header, LatestRooms } from '../components'

import { CreateRoom } from '../components'

import usePersistedState from '../hooks/usePersistedState'

import { DEFAULT_PARTICIPANT, STORAGE_KEY_USER } from '../constants'

import { UserInfo } from '../typings'
import { MainContainer } from '../styles/global'
import AccountModal from '../components/AccountModal'

const Home: FC = () => {
  const [toggleAccountModal, setToggleAccountModal] = useState(false)

  const { storeItem, getStoredItem } = usePersistedState()

  const userInfo: UserInfo = getStoredItem(
    STORAGE_KEY_USER,
    DEFAULT_PARTICIPANT
  )

  return (
    <MainContainer>
      <main>
        <AccountModal
          toggle={toggleAccountModal}
          setToggleModal={setToggleAccountModal}
        />

        <Header
          showOptions={false}
          setToggleAccountModal={setToggleAccountModal}
        />

        <LatestRooms userInfo={userInfo} />

        <PageContainer>
          <CreateRoom userInfo={userInfo} storeItem={storeItem} />
        </PageContainer>
        <Footer />
      </main>
    </MainContainer>
  )
}

export default Home
