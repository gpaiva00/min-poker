import React, { FC } from 'react'

import { PageContainer } from '../styles/Home.styles'

import { Footer, Header, LatestRooms } from '../components'

import { CreateRoom } from '../components'

import usePersistedState from '../hooks/usePersistedState'

import { DEFAULT_PARTICIPANT, STORAGE_KEY_USER } from '../constants'

import { UserInfo } from '../typings'

const Home: FC = () => {
  const { storeItem, getStoredItem } = usePersistedState()

  const userInfo: UserInfo = getStoredItem(
    STORAGE_KEY_USER,
    DEFAULT_PARTICIPANT
  )

  return (
    <div>
      <main>
        <Header />
        <LatestRooms userInfo={userInfo} />

        <PageContainer>
          <CreateRoom userInfo={userInfo} storeItem={storeItem} />
        </PageContainer>
        <Footer />
      </main>
    </div>
  )
}

export default Home
