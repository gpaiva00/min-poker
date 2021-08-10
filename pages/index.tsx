import React, { FC } from 'react'

import { PageContainer } from '../styles/Home.styles'

import { Footer, Header, LatestRooms } from '../components'

import { CreateRoom } from '../components'

import usePersistedState from '../hooks/usePersistedState'

import { DEFAULT_PARTICIPANT, STORAGE_KEY_USER } from '../constants'

import { UserInfo } from '../typings'
import { MainContainer } from '../styles/global'

const Home: FC = () => {
  const { storeItem, getStoredItem } = usePersistedState()

  const userInfo: UserInfo = getStoredItem(
    STORAGE_KEY_USER,
    DEFAULT_PARTICIPANT
  )

  return (
    <MainContainer>
      <main>
        <Header showOptions={false} />
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
